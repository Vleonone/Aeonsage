import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

/**
 * AEONSAGE Startup Boot Screen
 * Displays ASCII logo and system initialization sequence
 */
@customElement('aeonsage-boot')
export class AeonSageBoot extends LitElement {
  @state() private bootStage: 'logo' | 'portrait' | 'resonance' | 'minimal' | 'complete' = 'logo';
  @state() private progress = 0;

  private GENESIS_ASCII = `
                       . ..:~~::..  ...........                ...............:...                  
                       ..:~~::.               ..               .......................       .      
     ...           ....::~~.              .........        .   ......... .... ..   .....            
    .^.          ..::..::!.                  ........         ......:^~..........     ...           
    .         ....:...:~7^          .         ......  ..............:^~:.... .....      ..          
    .         ....:..:~!!..      ...          ........ ............:::::^^::...:...      .:.        
   .        ......:::^~~7....  ...... .. ........:...........:....::::~~~^::^::~?~....   ..:.       
  ..   .   .......:^^~J?Y7:.........:............^^...:......:^^:^^^:^??!^^^^~7!!!!^:... ....       
   .   . ...    ..^:~75#&&7^:...:::::::^:::::::::~~::::^::::::^~~~^^~!!????!^!5?^~J!:....  ...      
  ..  .. .... ...^^:^7YB##P~^:^::^:....::^~!~^^^^!!^~~^!!^::^:^^~^~7YP5PG57~^~~7::::...    ...     .
  ..^:....:......:!J??7J5J5GP7~^..........:~J?7!~?J!77YJ~^:.....:^~7G#PJYJ!^:^^^:.... ..   .:    ...
  ..!~...........:^7YJYYY57JG57~^::...::::^~YP7YP##B5?PY~^::..::^^^^!YJ7!~~^^^::::.......  .:   ..  
   ........:.....:^^JG???7!!Y5?77Y!~^::^^~7YPYJYP&&GPJJPY7!~::::^:^^^J5?!~^:::::.:.. ......:.. .. ..
   .........:.....:^~7!~7!^~?JY555??7!!?JJJJJP5PG&&GGP5?YYJ?7~~^^^^~!PP??7~^^:..:......^:.:........ 
.............:.......:^~~!~!7Y5G&#GYY?7?YP5JYGB#&@@&&BPYY5Y?!!!7!!77Y#GPPY7~^^~^:......:^^:......  .
.............::......::^~!!7JP&B5G57!7!JGGPPGB#&@@@@&#BGPGP5?!77!?YP#&#G5J7^^^^^:...:::^7:........  
...:...........:^:.:..:::^7?7JY5PY?7^~!!JGBBBB&&@@@@&&BB#BP?77!~7JG&&#GP57~:::.:::^^^^:............
:.....::.........::^^^^~~~7J5YJY555Y!^^!!!7J5PBB#@@&BG55J7!!!~7JPGBGGGPPJ?77~~~~~^^^::.:............
..::..^^........^...::^~77?7J55PPB&#G5?!~!!^:^7?7B#JJ7^:^77!7YG#&&#B#BPYJJJJ?!~^:::::::::::::.......
...^~:^!..............::^^!!7JY5GG#&&#&&B?55!::~^?J~~^^7P5Y#&&&@&&&#G5Y?77!~^^::::........:::7!~:...
...:^~^~^...::......::^^^^^^~~!!?PGB#&&&&#GGP?^..~~::~J5GB&&&@@&&BPJ77!~^:^:::...........:7?^::.
...:^~~~?7^^~^::::.::^~~~~!!777!~~7JPG&&&#&@#?^::~^.^~J&@&#&@&GPJ7~!7?J?77!~^^!~^:::.........::?7:::
...:^~~~?7^^~^::::.::^~~~~!!777!~~7JPG&&&#&@#?^::~^.^~J&@&#&@&GPJ7~!7?J?77!~^^!~^:::.........::?7:::
.::::^~7?J5PPY?7??77777777Y5PGPPGP!^~!!??PP5J777?PP?777JPGPJ7!!!~7GBGGGP5J777!~^^~^:^~:::.::~~!57^..
..:^::~7PJ??JP555PGGBBBBG5JYJYPPJ!^:^77?5G#G5Y5GB&&BP55G#&BY??7~^^!JPPYJJJ???7!!!!!!?J~:::^~?G&G!:..
...^~^^~!!!!!???JYY5B######GY?7!^:::...^!75B##&@@@@@@##&#57~^::::::~7??YPGGPGY???YJ!~^~~^!!7P#G7~^^^
..:::^~^~~!~~~!7?Y5PGB#&&&&&&&#P!^:.....:^!?5G#@@@@@@#BY?~^:......:!5B#####BG5JJ?77!~~!!75555Y7~^:..
......:^~!!!!!!!7JY555G#&&###B5!^::........::!?P#&@&G?!:.........:::~JG#####BP5Y7!7??JJJYJ!~~^:...:.
......:^!7!7???JJJY555PB#####B5~^..:~!Y!^::~~7Y?JGBY5Y!~~^^^~J!~:..^!PB&&&#B###BGPGGG5YY?!^^::::....
 ...::^^^~~!77??JYY55Y5GBBGPY?~^:^~!5#&PYJ~^::^~7PP?7~::^!JYG&#5!^::~!?5GB##BGPGGGG5Y5J?!~:::.......
  ...:::^^^~!7JJYPBP5YYYYJ777!^~^~?YB&&#&B7^~::::??^:::^^JB&&&&#Y7^:^^~777JY5YYYP#G5YY?!~^:::.......
.......::::^~!7YGG&@#GJ7!~^~~^:^!5PB&&&&&&P!!!:.:!!:::~~7B&&&&&&#PJ~::^~~~~~7J5G&@BBYJ7!^::::.......
   ......:::^::^^?PGY!^^::::^^!JPG#&&&@@&BP!:::..~~.:::^?GB&&#G&&#GPJ!:::^:::^~?557~^:^^^::::...:...
..........:::^~~!~~~~~~!!!!!?YPGB###&@@&G5!~:....~~....^~?GB&&B&&&#BGGY!~~~~~~~!!~~^^^~^^^^:::......
.........::::^~~!~!!7?JYYJY5GBB#&&###BP?!~:::::..^^..:::^!YYP&&&GB&&#GBP?77?7!~~!!~~~^^^::::........
.:.......:::^^~~?77JJ55Y5G&@@&##BBG5Y7~~:.:...::^^::..^^~JGBBBGY5&&#BBGYJ7??~^^^^^:^^^!!^^:::::.:..
......:...::^^~~!7JPGGGGB&@@@@&BGGY?!!~:..:.....:~~:::^~7J5PP??J5JG&####GJJ?YJ~^^^^:::::^^^::!5!:...
::::::^^^^~~~~777?Y5PGBBGGBBB##G5J!~^::.::.....::~!?7JYYY5Y7~!???J5#&&&&#G5Y555?~^^^:::......:^^:...
:::^~~7JJ??JJYP5YJ?7??JJY55Y?7!!!~::::::^:::.::~7JJY5J777!::^^~!!YG&&@@@&&BGPP57!~^^::..............
~^~~!77?YY5PPPY???7777???7777~::::::::::::^:^!!7JJJJY?7~::^:::^!?YG#&@@&&&&&BY??7~^^^^:::^..........
^^~~!!!!~^^^~~~!777JJJJ?7!~~~:::::..:^^~!JJYJ?!~~~~^:^:..::::^~!JPGBB##BB#&&BGG5J7!~~~~~^:::...^^:^^
^^^^:^::::^~^:^~~~~!!~^:::::::^^::^^~~!7?YB5??!^^^:.:....::.^^^~!7JJP5GGGGB##BGG555YY?!~^^^^^:^~~~~!
:....::::^^:.:::.::::::^7!^^^^^^~!~~~!~!!!!!!^:::..........:^:^^~!!!P5YYYPBBB###B##BP5Y?777777YJ?77J
.....::^^:.....:::::::^~7!::::::::::^^^::.:::::..::........::::^^^~!5YJ55JYPP5PGPPGBGPPGPPP5YGG?!~~~
....:::::...::::.....:::::^^:::::::^~^::.....:::........:....::^^~~~?5J?J55JYYYYYY?J5GB#&&#G55Y?!~^:
......:....:^:.::...:^5?^:::~P77~::~Y?7JJ^::!57^^J^::?J?!:.::?5~!~~7PPPPP?JJPBYY?J???JYGGP55J?7~^:::
...::..:!7^:^:......^5G&7:::!&J?^::#P^:^BB^:?BGG?P~::YBG?:::7G&B!~!P&J7JPJ7JG&5Y7!777??J5J????!!~::
...::....::.::^7Y?~:...:^:::^^^^~7P?^:::^^7GGBGB#BGPP7~^:::^?P?!^^^^~7^::...........^JJ7!!!~:.....
   ...:..........~J?~^:...::::::^!~!7YYJJJY5PGB#&@@&#BGP55YJJYY?!^^^^^^^::.......::..:J?7!~:.....  
   ..............::^^::^:......:::::^^~!7??JYY5GB&&#GP5YJ??7!~~^^^:::::::......:::~7!?J~~~^.....   
        ............::::^::.......:...:::^^^~~!7?Y5J?7!~~^^^::::^^^^^^^::::::::^^~J5PP7~^:........  
        .........     ........::::::::::.:::::^~!77!~~^^^:::^^^~~^^^~^:::^~~!77!7Y?!~~~^^::........ 
                     .  ........::::::::..:.:::^~~!~^^::^^^^^^!77!!~!~~~~^^:::^~!~^^:.::::........  
                 .:.....      ................::^^^^:::::^:::^^~!!!~~~^^^:::::^^:::.............    
                  ..            ...............:::^::..:::::~~^~^:........:::::.............        
                                   ...........:::^^^::.::^~~~:............................          
                                      .....:.:::!Y5!^:::^~!^:.:........................ ...         
                                       ......::^?&&J!^^^::........       ..     .:?:.......:.       
        .^..                   .         ......:^7?!^............                ....    ....       
        .....                             ..  ...:::.....  ...                              .       
                      .            .        .........       .                                       
                                             ....   ...                                            
    `;

  private RESONANCE_ASCII = `
                                                 ..                                                 
                               ..                ::                 ..                              
                           :!~.                  ::                 .^77:                           
                        .^7!.                    .:                    :JY~.                        
                       :!J:                     ...:                     !P?~.                      
                     ..~P.                      ^  ~                    . !P!:.                     
                   .. .YY .          ..         ~  7         :.          . #?.  .                   
                   ^. :#P .         !Y         .~  !:.       :P~         ..&#:  :                   
                  .^..~&@Y.        .?5   .::^^~J^  ~J~!^::.. :5!..       .P@@?..^.                  
                   : .:!J#5!^..   ..~PJ . :.::~Y.  .Y~7^.:...5?^..   . :!G&57~. :                   
                   ..  :^5#B5J~:.  ..!#5. .7:.:J    YY~^!. :P&7:.  ..:!5PBJ::   .                   
                 .:.:.  .~P&G77:^~!??~^757:~P~      . :Y!^JJ~^~?!~~::!J#&5^.   ....                 
                  .:::..  .^^^^^.^!?#P5?^7&BPJ~      ~?P#&!^?YB?!!^:~~^~~..  ..^..                  
                      .        ...:?BG7?7^7@#?!5.  .Y!7&&!:77?#P!..:.                               
                            . .  ..  :^^!GY^~?!^7  ?^~?!^JY!~~. ...  . ..                           
                     .....      ...::   .:~7^.!..  :.!.^!^..  .::...     ....::.                    
               .       .........            .:.^   .^.:.           ..........                       
               ?!:                                                        .        :^               
                7?!!~^^:..    ..                                  . ..   ..:::::::~:                
                 .::^^^...  : ^... .             ...            . :..7   .::^^^^:..                 
                           !~.P7:.  :~5P7^^~!?5GB##BG5?~^^^?5P7.  ::7#~  ..                         
                  .:^~::. .Y..B5::   :5&&&&&@@@== AEON ==@@@&&&&&5.   ?~J#? ..^~!~^^:.                  
                    ..  .. !. ^7^~.    :Y#&@@@@&&&&&@@@@@&BJ:    YB^~7..~.  ....                    
                       !!.  :  .!7?       .^7YG#&&&&#GJ!:.     .~~...  .~J.        .                
            .^:..:^:   ^~         :^ ..^~^: ^:  .:..  :^ :!~:...       ..^!~.   :^~:..^:            
           ~~~?:  :7!:  .  ..    ....:7P#5^.:J!..^~ .7Y:.~P&P7^:^:.    .:     :!?^  .7J77.          
          .!~:!J~77~!~.          .^:.:^J5Y~..:^7?&&JJ!^..~?5Y!^^^.      :   .~?~^!!~Y?:^!.          
           :~~.^!.    .         .:::.  :~77~^?B&@@@@@#J!!!~^.  .....        .:.    7!^^^:           
         :7G#GY!~.   .::^7?^^?5Y7?YG?.  .^~:.~J#@@@@&Y~.:~:   .7PYYJJYJ^:??^:.    .!7JGB#Y~         
          :~7:5JJ#5?GJ~~^^B@P!P&BJ~~!:    .:^?^~?@@#!5@&::^^JGJJ&JJG^~~:          
               :.^!.!YJ7:..5J~^^?7...      .!BB. J7 .#G7..      ..~?7:^JP^ .7J5?:!^.:.              
                      ..   7.:: .:.:.     .^~.7?    J7.7!.      . .^ ...!:  ..                      
                    .     ^:     .::   . . .5: .    .. G^        ^^. .  .!    ..                    
          .:~~~:...:.    .~~...  7:  .: .:   ... . !G.  :J.. .   :J.  ..~!.    ::.:..               
        .^^:..  ^Y5?.   .^   .        .^!^:.    ..7#5 . :&:^....   .    ..^    .::~!.               
       .:     .?J5P~.. .^         .. .!#GY~ ..  .~~..?^:~~  !?.:          :^    :?PPJ.              
       .:      7?7^.         ....:~^..:!55: :.. .:. :B&7J~ .  7Y..          ..     ~J?~              
              7^       .~?J~^^^^7BP!!!~. .::.:Y^.^?G57P5.~^:  ^^. ..   ...           !:              
              :   .~7!~~?7!~^^^^:::::^7?!:...:?7~!^..~? .?^    .. !#7  ...:.        .               
                .:^:.  .Y^      .:^~JP?^::^~?YY~.   .   :.        .^:.   ...:.                      
               ..       .   .^?Y?!^:::...^7!^.              .  .    ..       :.                     
               .      ..   :~!^..        .          .      . .:.    ...                             
                      ..      .    .               ...   .   .      .                               
                                        . .:.  .   ......                                           
                                         . :^^^..   ....                                            
                                          .::^^^.                                                   
                                           ^~~~~                                                    
                                              .                                                     
    `;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      background: #000000;
      font-family: 'JetBrains Mono', monospace;
      color: #888888;
      overflow: hidden;
    }

    .boot-container {
      position: relative;
      width: 90%;
      max-width: 800px;
      padding: 40px 20px;
      border: 1.5px solid #222222;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(0, 161, 0, 0.05);
      will-change: transform, opacity;
      animation: fadeIn 0.8s ease-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(26, 26, 26, 0.2);
    }

    /* Box Labels */
    .box-label {
      position: absolute;
      top: -10px;
      left: 30px;
      background: #000000;
      padding: 0 10px;
      font-size: 11px;
      letter-spacing: 0.2em;
      color: #00a100;
      font-weight: bold;
      text-transform: uppercase;
      user-select: none;
    }

    .box-footer {
      position: absolute;
      bottom: -10px;
      right: 30px;
      background: #000000;
      padding: 0 10px;
      font-size: 9px;
      color: #888888;
      user-select: none;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    /* Genesis Portrait Stage */
    .genesis-portrait {
      font-size: 3.5px; /* Smaller for box fit */
      line-height: 1;
      white-space: pre;
      color: #888888;
      opacity: 0.8;
      animation: scanline 4s linear infinite, glow-purple 2s ease-in-out infinite;
      user-select: none;
      margin: 10px 0;
    }

    @keyframes scanline {
      0% { background: linear-gradient(rgba(100, 100, 100, 0) 50%, rgba(100, 100, 100, 0.05) 50.1%); background-size: 100% 4px; }
    }

    @keyframes glow-purple {
      0%, 100% { color: #444444; filter: drop-shadow(0 0 2px rgba(0, 161, 0, 0.1)); }
      50% { color: #666666; filter: drop-shadow(0 0 10px rgba(0, 161, 0, 0.3)); }
    }

    /* Responsive ASCII Logo */
    .ascii-logo {
      white-space: pre;
      color: #888888;
      text-shadow: 
        0 0 10px rgba(136, 136, 136, 0.5),
        0 0 20px rgba(136, 136, 136, 0.3);
      animation: glow 2s ease-in-out infinite;
      line-height: 1.2;
    }

    /* Desktop XL (> 1200px) */
    @media (min-width: 1200px) {
      .ascii-logo { font-size: 10px; }
      .logo-xl { display: block; }
      .logo-l, .logo-m { display: none; }
    }

    /* Tablet L (768px - 1200px) */
    @media (min-width: 768px) and (max-width: 1199px) {
      .ascii-logo { font-size: 11px; }
      .logo-l { display: block; }
      .logo-xl, .logo-m { display: none; }
    }

    /* Mobile M (< 768px) */
    @media (max-width: 767px) {
      .ascii-logo { font-size: 13px; }
      .logo-m { display: block; }
      .logo-xl, .logo-l { display: none; }
    }

    @keyframes glow {
      0%, 100% { 
        text-shadow: 
          0 0 10px rgba(0, 161, 0, 0.4),
          0 0 20px rgba(0, 161, 0, 0.2);
      }
      50% { 
        text-shadow: 
          0 0 20px rgba(0, 161, 0, 0.7),
          0 0 40px rgba(0, 161, 0, 0.4);
      }
    }

    .subtitle {
      margin-top: 16px;
      font-size: 12px;
      letter-spacing: 0.3em;
      color: #888888;
    }

    /* Minimal Tech ID Stage */
    .minimal-tech {
      font-size: 12px;
      line-height: 1.5;
      white-space: pre;
      color: #888888;
    }

    .tech-title {
      font-size: 24px;
      letter-spacing: 0.5em;
      color: #ffffff;
      margin: 16px 0;
      text-shadow: 0 0 20px rgba(0, 161, 0, 0.5);
    }

    .tech-divider {
      color: #888888;
      margin: 12px 0;
    }

    .status-row {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin: 8px 0;
      font-size: 11px;
    }

    .status-label {
      color: #888888;
      min-width: 180px;
      text-align: right;
    }

    .status-value {
      color: #00FF88;
      font-weight: 600;
      text-align: left;
    }

    /* Progress Bar */
    .progress-container {
      margin-top: 32px;
      width: 400px;
    }

    .progress-bar {
      width: 100%;
      height: 3px;
      background: rgba(0, 255, 136, 0.1);
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #00a100 0%, #222222 100%);
      box-shadow: 0 0 10px rgba(0, 161, 0, 0.5);
      transition: width 0.3s ease;
    }

    .progress-text {
      margin-top: 12px;
      font-size: 10px;
      color: #858585;
      letter-spacing: 0.2em;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .ascii-logo {
        font-size: 6px;
      }
      .progress-container {
        width: 90%;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.startBootSequence();
  }

  private async startBootSequence() {
    // Stage 0: Genesis Portrait (ASCII Awakening)
    this.bootStage = 'portrait';
    await this.delay(3500);

    // Stage 1: Show ASCII Logo
    this.bootStage = 'logo';
    await this.delay(2000);

    // Stage 2: Switch to Minimal Tech ID
    this.bootStage = 'minimal';
    await this.delay(1000);

    // Stage 3: Simulate progress
    for (let i = 0; i <= 100; i += 5) {
      this.progress = i;
      await this.delay(100);
    }

    // Stage 4: Complete - dispatch event
    this.bootStage = 'complete';
    this.dispatchEvent(new CustomEvent('boot-complete', { bubbles: true, composed: true }));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  render() {
    if (this.bootStage === 'portrait') {
      return html`
        <div class="boot-container">
          <div class="box-label">GENESIS_FREQUENCY</div>
          <div class="genesis-portrait">${this.GENESIS_ASCII}</div>
          <div class="box-footer">SIG: 0xAEON..INITIAL</div>
        </div>
      `;
    }

    if (this.bootStage === 'resonance') {
      return html`
        <div class="boot-container">
          <div class="box-label" style="color: var(--text-muted);">SOVEREIGN_RESONANCE</div>
          <div class="genesis-portrait" style="font-size: 4px; color: var(--text-muted); opacity: 1; filter: drop-shadow(0 0 15px rgba(136, 136, 136, 0.4));">${this.RESONANCE_ASCII}</div>
          <div class="box-footer">CORE: AWAKENING</div>
        </div>
      `;
    }

    if (this.bootStage === 'logo') {
      return html`
        <div class="boot-container">
          <div class="box-label">MANIFESTATION_ ritual</div>
          <pre class="ascii-logo">鈺斺晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晽
鈺?                                                             鈺?鈺?    鈻堚枅鈻堚枅鈻堚晽 鈻堚枅鈻堚枅鈻堚枅鈻堚晽鈻堚枅鈻堚枅鈻堚枅鈻堚晽鈻堚枅鈻堚晽   鈻堚枅鈺椻枅鈻堚枅鈻堚枅鈻堚枅鈺?鈻堚枅鈻堚枅鈻堚晽 鈻堚枅鈻堚枅鈻堚枅鈻堚晽 鈺?鈺?   鈻堚枅鈺斺晲鈺愨枅鈻堚晽鈻堚枅鈺斺晲鈺愨晲鈺愨暆鈻堚枅鈺斺晲鈺愨晲鈺愨暆鈻堚枅鈻堚枅鈺? 鈻堚枅鈺戔枅鈻堚晹鈺愨晲鈺愨晲鈺濃枅鈻堚晹鈺愨晲鈻堚枅鈺椻枅鈻堚晹鈺愨晲鈺愨晲鈺?鈺?鈺?   鈻堚枅鈻堚枅鈻堚枅鈻堚晳鈻堚枅鈻堚枅鈻堚晽  鈻堚枅鈻堚枅鈻堚晽  鈻堚枅鈺斺枅鈻堚晽 鈻堚枅鈺戔枅鈻堚枅鈻堚枅鈻堚枅鈺椻枅鈻堚枅鈻堚枅鈻堚枅鈺戔枅鈻堚枅鈻堚枅鈻堚枅鈺?鈺?鈺?   鈻堚枅鈺斺晲鈺愨枅鈻堚晳鈻堚枅鈺斺晲鈺愨暆  鈻堚枅鈺斺晲鈺愨暆  鈻堚枅鈺戔暁鈻堚枅鈺椻枅鈻堚晳鈺氣晲鈺愨晲鈺愨枅鈻堚晳鈻堚枅鈺斺晲鈺愨枅鈻堚晳鈺氣晲鈺愨晲鈺愨枅鈻堚晳 鈺?鈺?   鈻堚枅鈺? 鈻堚枅鈺戔枅鈻堚枅鈻堚枅鈻堚枅鈺椻枅鈻堚枅鈻堚枅鈻堚枅鈺椻枅鈻堚晳 鈺氣枅鈻堚枅鈻堚晳鈻堚枅鈻堚枅鈻堚枅鈻堚晳鈻堚枅鈺? 鈻堚枅鈺戔枅鈻堚枅鈻堚枅鈻堚枅鈺?鈺?鈺?   鈺氣晲鈺? 鈺氣晲鈺濃暁鈺愨晲鈺愨晲鈺愨晲鈺濃暁鈺愨晲鈺愨晲鈺愨晲鈺濃暁鈺愨暆  鈺氣晲鈺愨晲鈺濃暁鈺愨晲鈺愨晲鈺愨晲鈺濃暁鈺愨暆  鈺氣晲鈺濃暁鈺愨晲鈺愨晲鈺愨晲鈺?鈺?鈺?                                                             鈺?鈺?           AEONSAGE 路 COSMIC INTELLIGENCE ENGINE              鈺?鈺?           Observation Layer Initialized                     鈺?鈺?                                                             鈺?鈺氣晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨晲鈺愨暆</pre>
          <div class="box-footer">VERSION: AS-2.0.0</div>
        </div>
      `;
    }

    if (this.bootStage === 'minimal' || this.bootStage === 'complete') {
      return html`
        <div class="boot-container" style="max-width: 500px; border-color: var(--border); box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);">
          <div class="box-label" style="color: var(--ok);">SYSTEM_CALIBRATION</div>
          <div class="tech-title" style="color: var(--text-strong); text-shadow: 0 0 10px rgba(0, 161, 0, 0.3);">A E O N S A G E</div>

          <div style="margin: 24px 0; width: 100%;">
            <div class="status-row">
              <span class="status-label">Intelligence Core</span>
              <span class="status-value" style="color: var(--ok); text-shadow: 0 0 8px var(--ok);">ONLINE</span>
            </div>
            <div class="status-row">
              <span class="status-label">Genesis Signature</span>
              <span class="status-value" style="color: var(--text-muted)">VERIFIED</span>
            </div>
            <div class="status-row">
              <span class="status-label">Time Scope</span>
              <span class="status-value" style="color: var(--text-muted)">AEON</span>
            </div>
            <div class="status-row">
              <span class="status-label">Observation</span>
              <span class="status-value" style="color: var(--ok)">ACTIVE</span>
            </div>
          </div>

          ${this.bootStage === 'minimal' ? html`
            <div class="progress-container">
              <div class="progress-bar" style="background: rgba(100, 100, 100, 0.1); border: 1px solid var(--border-subtle);">
                <div class="progress-fill" style="width: ${this.progress}%; background: linear-gradient(90deg, var(--accent-secondary), var(--text-muted));"></div>
              </div>
              <div class="progress-text" style="color: var(--text-muted); font-size: 8px;">
                ${this.progress < 100 ? 'SYNCHRONIZING CONSCIOUSNESS...' : 'SYNCH COMPLETE'}
              </div>
            </div>
          ` : ''}
          <div class="box-footer">G-OS // TERMINAL READY</div>
        </div>
      `;
    }

    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeonsage-boot': AeonSageBoot;
  }
}

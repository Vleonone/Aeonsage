summary: "Use Google Gemini API keys in AeonSage"
read_when:
  - You want to use Gemini models via the Google API
  - You need a quick setup example for Gemini auth
---
# Google Gemini

Google Gemini provides hosted models via the Gemini API. In AeonSage, the provider id is
`google` and model refs are `google/<model>`.

## Get an API key

Create a key in Google AI Studio:
https://aistudio.google.com/app/apikey

## CLI setup

```bash
aeonsage onboard --auth-choice gemini-api-key
```

## Config snippet

```json5
{
  env: { GEMINI_API_KEY: "AIza..." },
  agents: { defaults: { model: { primary: "google/gemini-3-flash-preview" } } }
}
```

## Notes

- Model refs are `google/gemini-3-flash-preview` or `google/gemini-3-pro-preview`.
- Use `GEMINI_API_KEY` or `models.providers.google.apiKey` for auth.

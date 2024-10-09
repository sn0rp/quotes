import { Quote } from '../types';

export async function generateQuote(): Promise<Quote> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key is not set');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a funny inspirational quote generator. Create a quote that sounds profound but is actually nonsensical, along with an attribution to a random famous person with a humorous twist.',
        },
        {
          role: 'user',
          content: 'Generate a funny inspirational quote with attribution.',
        },
      ],
      max_tokens: 100,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate quote');
  }

  const data = await response.json();
  const generatedText = data.choices[0].message.content.trim();

  // Split the generated text into quote and author
  const [quote, author] = generatedText.split(' - ');

  return {
    text: quote.replace(/^"|"$/g, ''), // Remove surrounding quotes if present
    author: author || 'Unknown',
  };
}
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText } from 'ai'
import { aiPrompt } from '@/app/ai-prompt'

export const maxDuration = 30

export async function POST (req: Request) {
	const { messages } = await req.json()

	const google = createGoogleGenerativeAI({
		apiKey: process.env.GOOGLE_API_KEY,
	})

	const result = streamText({
		model: google('gemini-2.0-pro-exp-02-05'),
		system: aiPrompt,
		messages,
	})

	return result.toDataStreamResponse()
}

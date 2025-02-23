'use client'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'
import { Fragment, useEffect, useRef, useState } from 'react'
import { TextShimmer } from '@/components/ui/text-shimmer'
import { initialTexts } from '@/app/views/home'
import { useChat } from '@ai-sdk/react'

export const HomeForm = (
	{
		setTexts,
	}: {
		setTexts: (texts: string[]) => void
	},
) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	const [text, setText] = useState<string>('')
	const [isThinking, setIsThinking] = useState(false)

	const { messages, setMessages, input, setInput, handleSubmit, status } = useChat()

	const handle = async () => {
		if (text.trim() === '' || isThinking) return

		setMessages([])
		setText('')
		if (textAreaRef.current) {
			textAreaRef.current.value = ''
		}

		setTexts(['Нейросеть', 'думает...'])
		setIsThinking(true)

		try {
			handleSubmit()
		} catch (err) {
			console.error(err)
		} finally {
			setTexts(initialTexts)
			setIsThinking(false)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.ctrlKey && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
			e.preventDefault()
			handle()
		}
	}

	useEffect(() => {
		setInput(text)
	}, [setInput, text])

	useEffect(() => {
		console.log('status: ', status)
	}, [status])

	return (
		<div className="relative min-h-[144px]">
			<form
				className={cn(
					'absolute top-0 left-0 w-full transition-all duration-500 z-10',
					isThinking
						? 'opacity-0 -translate-y-2 pointer-events-none'
						: 'opacity-100',
				)}
				onSubmit={handle}
			>
				<Textarea
					className="resize-none pr-12"
					rows={4}
					ref={textAreaRef}
					value={input}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Например: Что такое пикми"
				/>

				<Button
					variant="ghost"
					size="icon"
					className="absolute bottom-2 right-2"
					onClick={handle}
					disabled={text.trim() === ''}
				>
					<Icon
						icon="iconamoon:send-fill"
						className="min-w-6 min-h-6"
					/>
				</Button>
			</form>

			<div
				className={cn(
					'absolute top-0 left-0 w-full transition-all duration-500 z-20 h-full flex items-center justify-center',
					isThinking
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-2 pointer-events-none',
				)}
			>
				<TextShimmer
					className="font-mono text-2xl font-semibold"
					duration={1}
				>
					Нейросеть думает...
				</TextShimmer>
			</div>

			<div
				className={cn(
					'border p-4 rounded-lg w-full mt-32 flex justify-start gap-4',
					(
						messages?.filter(m => m?.role === 'assistant')?.length > 0
						||
						status === 'submitted'
						||
						status === 'streaming'
					)
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-2 pointer-events-none',
				)}
			>
				<Icon
					icon="lucide:bot"
					className="min-w-6 min-h-6"
				/>

				<div className="text-sm">
					{status === 'submitted' && (
						<TextShimmer
							className="font-mono text-2xl font-semibold"
							duration={1}
						>
							...
						</TextShimmer>
					)}

					{messages?.filter(m => m?.role === 'assistant')?.map?.((msg, index) => (
						<Fragment key={index}>
							{msg?.content}
						</Fragment>
					))}
				</div>
			</div>
		</div>
	)
}

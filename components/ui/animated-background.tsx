'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export const AnimatedBackground = (
	{
		className,
		subClassName,
	}: {
		className?: string,
		subClassName?: string,
	},
) => {
	const [points, setPoints] = useState<[number, number][] | null>(null)

	const poly = points
		? points.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', ')
		: ''

	function jumpVal (val: number) {
		return Math.random() > 0.5
			? val + (Math.random() - 0.5) / 2
			: Math.random()
	}

	useEffect(() => {
		const initialPoints = Array.from({ length: 16 }, () => [
			Math.random(),
			Math.random(),
		] as [number, number])

		setPoints(initialPoints)

		let timeout: NodeJS.Timeout

		function jumpPoints () {
			setPoints((prevPoints) =>
				prevPoints ? prevPoints.map(([x, y]) => [jumpVal(x), jumpVal(y)]) : [],
			)
			timeout = setTimeout(jumpPoints, 2000 + Math.random() * 1000)
		}

		jumpPoints()

		return () => clearTimeout(timeout)
	}, [])

	return (
		<div
			className={cn(
				'bg absolute inset-0 -z-10 transform-gpu blur-3xl overflow-hidden pointer-events-none',
				className,
			)}
			aria-hidden="true"
		>
			<div
				className={cn(
					'aspect-[1.7] h-full w-full bg-gradient-to-r lg:opacity-30 xs:opacity-50',
					subClassName,
				)}
				style={{
					clipPath: `polygon(${poly})`,
					transitionProperty: 'clip-path',
					transitionDuration: '3s',
					transitionTimingFunction: 'ease',
					transitionDelay: '0s',
				}}
			/>
		</div>
	)
}

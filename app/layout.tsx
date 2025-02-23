import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ReactNode } from 'react'

import '@/app/assets/app.css'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	title: 'Переводчик с зумерского',
	description: 'описание сайта украли бобры',
}

export default function RootLayout (
	{
		children,
	}: Readonly<{
		children: ReactNode,
	}>,
) {
	return (
		<html className="dark" lang="ru">
		<body
			className={`${montserrat.variable} antialiased`}
		>
		{children}
		</body>
		</html>
	)
}

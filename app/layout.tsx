import type { Metadata } from 'next'
import { Montserrat, Montserrat_Alternates } from 'next/font/google'
import { ReactNode } from 'react'

import '@/app/assets/app.css'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	weight: ['400', '500', '600', '700', '800'],
	subsets: ['latin', 'cyrillic'],
})

const montserratAlternates = Montserrat_Alternates({
	variable: '--font-montserrat-alternates',
	weight: ['400', '500', '600', '700', '800'],
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
			className={`${montserrat.variable} ${montserratAlternates.variable} antialiased`}
		>
		{children}
		</body>
		</html>
	)
}

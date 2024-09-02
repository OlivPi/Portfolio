import {IBM_Plex_Sans, Roboto_Mono} from "next/font/google";

export const ibm_plex = IBM_Plex_Sans({
    weight: ["200", "300", "400", "500", "600", "700"],
    display: "swap",
    preload: true,
    subsets: [ "latin"],
    variable: '--font-ibm',
})

export const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
})
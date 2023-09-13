import Head from "next/head";
import React from "react";
import {Error404} from "@/components/Error404";

const Custom404 = () => {

    return (
        <>
            <Head>
                <title>404</title>
                <meta name="description" content="¡Bienvenidos al mundo de risas y caos de los Looney Tunes! Explora las travesuras de Bugs Bunny, Daffy Duck y más. Revive momentos clásicos, descubre curiosidades y celebra el legado de estos personajes icónicos de la animación." />
                <link rel="icon" href="/logo.ico" />
            </Head>
            <Error404 />
        </>
    )
}

export default Custom404
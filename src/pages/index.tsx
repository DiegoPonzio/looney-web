import Image from 'next/image'
import { Inter } from 'next/font/google'
import {Layout} from "@/components/Layout";
import Link from "next/link";
import {HiOutlineArrowLongRight} from "react-icons/hi2";
import {MainPage} from "@/components/MainPage";


export default function Home() {
  return (
    <Layout title={"Looney Web"}>
        <MainPage/>
    </Layout>
  )
}

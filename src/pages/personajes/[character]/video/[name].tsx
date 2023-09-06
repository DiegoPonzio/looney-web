import {Layout} from "@/components/Layout";
import {VideoNavegation} from "@/components/video/VideoNavegation";
import {getVideoCharacters} from "@/lib/charactersFactory";
import {GetStaticPaths, GetStaticProps} from "next";
import {FC} from "react";

interface MyProps {
    name: any;
    character: any;
}

const VideoName: FC<MyProps> = ({ name, character }) => {
    const cleanName = name.replace(/-/g, ' ');

    return (
        <Layout title={cleanName}>
            <VideoNavegation title={cleanName} name={name} character={character}/>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths =  async () => {
    const videoNames = await getVideoCharacters();
    const paths: {params: { character: string , name: string }}[] = []

    videoNames.forEach((videoName) => {
        videoName.info.forEach((info) => {
            paths.push({params: {character: videoName.name.replace(/\s/g, '-'), name: info.replace(/\s/g, '-').replace("?", "")}})
        })
    })

    return { paths, fallback: false };
}


export const getStaticProps: GetStaticProps<MyProps> = async ({ params }) => {

    return { props: { name: params?.name || "", character: params?.character || "" } };
}

export default VideoName;

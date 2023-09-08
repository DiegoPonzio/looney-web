import {Layout} from "@/components/Layout";
import {FC} from "react";
import {GetStaticPaths, GetStaticProps} from "next";
import {getVideoWithCategories} from "@/lib/charactersFactory";
import {VideoNavegation} from "@/components/video/VideoNavegation";

interface MyProps {
    name: any;
    character: any;
    category: any;
}

const VideoName: FC<MyProps> = ({ name, character, category }) => {
    const cleanName = name.replace(/-/g, ' ');

    return (
        <Layout title={cleanName}>
            <VideoNavegation title={cleanName} character={character} name={name} category={category} />
        </Layout>
    );
}

export default VideoName;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: {params: { character: string, name: string, category: string }}[] = [];

    // los videos con categorias
    const videosWithCategory = await getVideoWithCategories();

    videosWithCategory.forEach((video) => {
        const { name, info } = video;

        info.forEach((info) => {
            const {name: nameCategory, info: infoCategory} = info;

            infoCategory?.forEach((infoCategory) => {
                paths.push({params: {character: name.replace(/\s/g, '-'), name: infoCategory.name.replace(/\s/g, '-').replace("?", ""), category: nameCategory.replace(/\s/g, '-').replace("?", "")}})
            });
        });
    });


    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<MyProps> = async ({ params }) => {

    return { props: { name: params?.name || "", character: params?.character || "", category: params?.category || "" } };
}
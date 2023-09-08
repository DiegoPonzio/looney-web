interface CartoonCharacter {
    name: string;
    info: CartoonInfo[];
}

interface CartoonInfo {
    info: { name: string, link: string }[] | undefined;
    link: string | null;
    name: string;
}

export type { CartoonCharacter, CartoonInfo };
interface CartoonCharacter {
    name: string;
    info: CartoonInfo[];
}

interface CartoonInfo {
    name: string;
    link: string | null;
}

export type { CartoonCharacter, CartoonInfo };
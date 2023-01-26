import http from "./http";
interface Explains {
    pos: string;
    trans: string;
}
interface Word {
    id: number;
    word: string;
    uk_phonetic: string;
    us_phonetic: string;
    uk_phonetic_audio: string;
    us_phonetic_audio: string;
    example_en: string;
    example_zh: string;
    example_dict: string;
    example_audio: string;
    explains: Explains[];
}
interface ApiWords {
    amount: number;
    results: Word[];
}
export async function getWords(): Promise<ApiWords> {
    // 获取单词表
    const response: any = await http.get("/words", {
        params: {
            page: 1,
            limit: 10,
        },
    });
    return response.data;
}
export function getWordDetail() {
    // 获取单词详情
}

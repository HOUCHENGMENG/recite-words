export async function playAudio(url: string) {
    const audio: HTMLAudioElement = new Audio(url);
    await audio.play();
    return audio;
}

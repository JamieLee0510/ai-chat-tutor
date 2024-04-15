import React, { useEffect, useRef, useState } from "react";
import { useTutorAudioStore } from "../../../_store/audioStore";
const minRadius = 50; // 最小半徑
const maxRadius = 200; // 最大半徑
const sensitivityFactor = 5;
const fillColor = "#0d7aefe6";
const drawInitial = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, minRadius, 0, 2 * Math.PI, false);
    ctx.fill();
};

export default function ChatAudioVisualizer() {
    const { tutorAudio, cleanup, audioContext, mediaSource } =
        useTutorAudioStore();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0); // 用于保存动画帧请求的引用
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

    useEffect(() => {
        // 清理函数，防止内存泄漏

        return () => {
            if (!tutorAudio?.paused) {
                console.log("----call pause in useEffect");
                tutorAudio?.pause();
            }
            console.log("---call cleanup in useEffect return");
            cleanup();
            // mediaSource?.disconnect();
            analyser?.disconnect();
            setAnalyser(null);
            audioContext?.close(); // 关闭AudioContext，释放资源
        };
    }, []);

    useEffect(() => {
        if (tutorAudio && audioContext && mediaSource) {
            // const ac = new window.AudioContext();
            const analyser = audioContext.createAnalyser();
            // const source = audioContext.createMediaElementSource(tutorAudio);
            // source.connect(analyser);
            mediaSource.connect(analyser);
            analyser.connect(audioContext.destination);

            setAnalyser(analyser);

            // 清理函数，防止内存泄漏
            return () => {
                // if (!tutorAudio.paused) {
                //     console.log("----call pause in useEffect");
                //     tutorAudio.pause();
                // }
                // console.log("---call cleanup in useEffect return");
                // cleanup();
                // // mediaSource?.disconnect();
                // analyser.disconnect();
                // setAnalyser(null);
                // audioContext.close(); // 关闭AudioContext，释放资源
            };
        }
    }, [tutorAudio, audioContext, mediaSource]); // 移除audioContext作为依赖项，以避免重复创建

    const draw = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        const width = canvas.width;
        const height = canvas.height;
        if (analyser) {
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);
            const radius = Math.max(
                minRadius,
                Math.min(
                    maxRadius,
                    (dataArray.reduce((acc, val) => acc + val, 0) /
                        bufferLength /
                        2) *
                        sensitivityFactor
                )
            );

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "#0d7aefe6";

            ctx.beginPath();
            ctx.arc(
                width / 2,
                height / 2,
                Math.max(10, radius),
                0,
                2 * Math.PI,
                false
            ); // 确保圆至少有最小大小
            ctx.fill();
            // console.log("----draw the ctx?", ctx);
        } else {
            drawInitial(ctx, width, height);
        }
        requestRef.current = requestAnimationFrame(draw);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(requestRef.current);
    }, [analyser]); // 依赖于analyser的变化

    return <canvas ref={canvasRef} width="400" height="400" />;
}

// we're gonna check a webcam.
import { Client, Message } from "discord.js";
import fetch from "node-fetch";
const config = require('../../config.json');

interface WindyWebcam {
    "id": string,
    "status": "active" | "inactive",
    "title": "Wellington",
    "image": {
        "current": {
            "icon": string;
            "thumbnail": string;
            "preview": string;
            "toenail": string;
        },
        "sizes": {
            "icon": {
                "width": number,
                "height": number
            },
            "thumbnail": {
                "width": number,
                "height": number
            },
            "preview": {
                "width": number,
                "height": number
            },
            "toenail": {
                "width": number,
                "height": number;
            }
        },
        "daylight": {
            "icon": string;
            "thumbnail": string;
            "preview": string;
            "toenail": string;
        },
        "update": number;
    }
}

let previousWebcamImage = '';
let lastFetchedTimestamp = 0;
const windyUrl = "https://api.windy.com/api/webcams/v2/list/webcam=1634250804/limit=1?show=webcams:image";
const check = async (message: Message) => {
    if (lastFetchedTimestamp !== 0 && lastFetchedTimestamp > Date.now() - 60000) {
        message.reply(previousWebcamImage);
        return;
    }
    try {
        const windyResponse = await fetch(`${windyUrl}&key=${config.windyKey}`);
        console.log('fetched again', lastFetchedTimestamp);
        lastFetchedTimestamp = Date.now();
        const body = await windyResponse.json();
        if (body.status === 'OK') {
            const ourWebcam: WindyWebcam = body.result.webcams[0];
            if (ourWebcam.status !== 'active') {
                message.reply("Webcam is inactive..!");
            }
            const webcamImage = `${ourWebcam.image.current.preview}?t=${lastFetchedTimestamp}`;
            if (webcamImage !== previousWebcamImage) {
                previousWebcamImage = webcamImage;
            }
            message.reply(webcamImage)
        }
    } catch (e) {
        console.error(e);
    }
    return;
}

export default check;
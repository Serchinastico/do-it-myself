export const audioRecordingStyle = `
.audio-player {
    position: relative;
    width: 250px;
    height: 72px;
    border-radius: 16px;
    display: flex;
    padding-left: 8px;
    margin-top: 16px;
    margin-bottom: 16px;
    justify-content: center;
    align-items: center;
}

.audio-player .controls {
    cursor: pointer;
}

.audio-player .hidden {
    display: none;
}

.audio-player .waveform {
    margin-left: 12px;
}

.audio-player .remaining_time {
    position: absolute;
    font-size: 14px;
    font-weight: 500;
    bottom: 6px;
    right: 8px;
}
`;

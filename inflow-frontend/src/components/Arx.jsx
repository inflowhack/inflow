import {execHaloCmdWeb} from '@arx-research/libhalo/api/web.js';
import {useState} from "react";

function Arx() {
    const [statusText, setStatusText] = useState("");
    async function onClickBTN() {
        let command = {
            name: "sign",
            keyNo: 1,
            message: "010203",
            /* uncomment the line below if you get an error about setting "command.legacySignCommand = true" */
            // legacySignCommand: true,
        };

        let res;

        try {
            // --- request NFC command execution ---
            res = await execHaloCmdWeb(command, {
                statusCallback: (cause) => {
                    if (cause === "init") {
                        setStatusText("Please tap the tag to the back of your smartphone and hold it...");
                    } else if (cause === "retry") {
                        setStatusText("Something went wrong, please try to tap the tag again...");
                    } else if (cause === "scanned") {
                        setStatusText("Tag scanned successfully, post-processing the result...");
                    } else {
                        setStatusText(cause);
                    }
                }
            });
            // the command has succeeded, display the result to the user
            setStatusText(JSON.stringify(res, null, 4));
        } catch (e) {
            // the command has failed, display error to the user
            setStatusText('Scanning failed, click on the button again to retry. Details: ' + String(e));
        }
    }

    return (
        <div className="App">
            <pre style={{fontSize: 12, textAlign: "left", whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
                {statusText}
            </pre>
            <button onClick={() => onClickBTN()}>Sign message 010203 using key #1</button>
        </div>
    );
}

export default Arx;

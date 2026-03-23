document.getElementById("submission-button").onclick = processInput;
document.getElementById("example-button").onclick = () => document.getElementById("submission-box").value = "MEGSTGFDGDATTFFAPDAVFGDRVRRFQEFLDTFTSYRDSVRSIQVYNSNNAANYNDDQDDADERDLLGDDDGDDLEKEKKAASSTSLNILPHRIIISLDDLREFDRSFWSGILVEPAYFIPPAEKALTDLADSMDDVPHPNASAVSSRHPWKLSFKGSFGAHALSPRTLTAQHLNKLVSVEGIVTKTSLVRPKLIRSVHYAAKTGRFHYRDYTDATTTLTTRIPTPAIYPTEDTEGNKLTTEYGYSTFIDHQRITVQEMPEMAPAGQLPRSIDVILDDDLVDKTKPGDRVNVVGVFKSLGAGGMNQSNSNTLIGFKTLILGNTVYPLHARSTGVAARQMLTDFDIRNINKLSKKKDIFDILSQSLAPSIYGHDHIKKAILLMLMGGVEKNLENGSHLRGDINILMVGDPSTAKSQLLRFVLNTASLAIATTGRGSSGVGLTAAVTTDRETGERRLEAGAMVLADRGVVCIDEFDKMTDVDRVAIHEVMEQQTVTIAKAGIHTTLNARCSVIAAANPVFGQYDVNRDPHQNIALPDSLLSRFDLLFVVTDDINEIRDRSISEHVLRTHRYLPPGYLEGEPVRERLNLSLAVGEDADINPEEHSNSGAGVENEGEDDEDHVFEKFNPLLQAGAKLAKNKGNYNGTEIPKLVTIPFLRKYVQYAKERVIPQLTQEAINVIVKNYTDLRNDDNTKKSPITARTLETLIRLATAHAKVRLSKTVNKVDAKVAANLLRFALLGEDIGNDIDEEESEYEEALSKRSPQKSPKKRQRVRQPASNSGSPIKSTPRRSTASSVNATPSSARRILRFQDDEQNAGEDDNDIMSPLPADEEAELQRRLQLGLRVSPRRREHLHAPEEGSSGPLTEVGTPRLPNVSSAGQDDEQQQSVISFDNVEPGTISTGRLSLISGIIARLMQTEIFEEESYPVASLFERINEELPEEEKFSAQEYLAGLKIMSDRNNLMVADDKVWRV";

function displayResults(seq, preds, predictedNLSList) {

    residueNumList = Array.from({ length: preds.length }, (_, i) => i + 1);

    const traceData = {
        x: residueNumList,
        y: preds,
        mode: "lines"
    };

    // const signalPlot = {
    //     x: Array.from({ length: preds.length }, (_, i) => i + 1),
    //     y: Array.from({ length: preds.length }, (_, i) => 0),
    //     mode: "lines",
    //     xaxis: "x2",
    //     yaxis: "y2"
    // }

    const layout = {
        title: {text: "Predictions"},
        shapes: [{
                type: "line",
                x0: residueNumList[0],
                x1: residueNumList[residueNumList.length - 1],
                y0: 0.5,
                y1: 0.5,
                line: {
                    color: "#000000",
                    dash: "dash"
                }
            }],
        //grid: {rows: 2, columns: 1, pattern: "coupled"},
        //subplots: ["xy", "xy2"],
        //yaxis2: {
            //visible: false,
            //showline: false,
            //linewidth: 0,
            //zeroline: false,
            //zerolinewidth: 0,
            //linecolor: "#FFFFFF"
        //},
        // shapes: [
        //     {
        //         type: "line",
        //         xref: "x",
        //         yref: "y2",
        //         x0: residueNumList[0],
        //         x1: residueNumList[residueNumList.length - 1],
        //         y0: 0,
        //         y1: 0,
        //         line: {
        //             color: "#000000"
        //         }
        //     },

        //     {
        //         type: "rect",
        //         fillcolor: "#D1D1D1",
        //         line: {
        //             color: "#000000"
        //         },
        //         x0: 10,
        //         x1: 25,
        //         y0: -1,
        //         y1: 1,
        //         xref: "x",
        //         yref: "y2"
        //     }
        // ]
        xaxis: {
            range: [0, preds.length],
            fixedrange: true
        },

        yaxis: {
            range: [0, 1],
            constrain: "domain",
            autorange: false,
            fixedrange: true,
        }
    }

    const config = { displaylogo: false}

    Plotly.newPlot("trace-plot", [traceData], layout, config)

    const signalData = {}

    let shapes = [
            {
                type: "line",
                x0: residueNumList[0],
                x1: residueNumList[residueNumList.length - 1],
                y0: 0.5,
                y1: 0.5,
                line: {
                    color: "#000000"
                }
            }
        ]

    for (i=0; i < predictedNLSList.length; i++) {
        range = predictedNLSList[i]

        shapes.push({
                type: "rect",
                fillcolor: "#D1D1D1",
                line: {
                    color: "#000000"
                },
                x0: range[0],
                x1: range[1],
                y0: 0.4,
                y1: 0.6
        })
    }

    const signalLayout = {
        title: {text: "Predicted NLSs"},
        height: 250,
        shapes: shapes,
        // shapes: [
        //     {
        //         type: "line",
        //         x0: residueNumList[0],
        //         x1: residueNumList[residueNumList.length - 1],
        //         y0: 0.5,
        //         y1: 0.5,
        //         line: {
        //             color: "#000000"
        //         }
        //     },

        //     {
        //         type: "rect",
        //         fillcolor: "#D1D1D1",
        //         line: {
        //             color: "#000000"
        //         },
        //         x0: 10,
        //         x1: 25,
        //         y0: 0.4,
        //         y1: 0.6,
        //     }
        //],
        
        xaxis: {
            range: [0, preds.length],
            fixedrange: true
        },

        yaxis: {
            range: [0, 1],
            constrain: "domain",
            autorange: false,
            fixedrange: true,
            visible: false,
            showticklabels: false,
            showline: false,
            linewidth: 0,
            linecolor: 'rgba(0,0,0,0)',
            zeroline: false,
            showgrid: false,
            ticks: '',
            mirror: false
        }
    }

    Plotly.newPlot("signal-plot", [signalData], signalLayout, config)
}

function changeCallout(calloutId, message) {
    ["warning-callout", "processing-callout", "success-callout"].forEach((id) => {
        document.getElementById(id).classList.remove("active")
    });

    document.getElementById(calloutId).classList.add("active")
    document.getElementById(calloutId).querySelector("p").textContent = message
}

// function hideResults() {
//     document.getElementById("trace-plot").textContent = ""
// }

async function processInput() {
    const seqs = document.getElementById("submission-box").value.toUpperCase();

    // Validate input string is not empty
    if (seqs === "") {
        changeCallout("warning-callout", "Empty sequence provided")
    }

    // Validate input string only contains allowed amino acid residues
    else if (!/^[ACDEFGHIKLMNPQRSTVWY]+$/.test(seqs)) {
        changeCallout("warning-callout", "Invalid residue sequence provided")
    }

    else {
        changeCallout("processing-callout", "Processing sequences...")
        document.getElementById("submission-button").classList.add("disabled-button")
        document.getElementById("submission-button").disabled = true
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"seqs": seqs})
        });

        const predictions = await response.json();

        displayResults(seqs, predictions["preds"], predictions["predictedNLSList"])

        document.getElementById("submission-button").classList.remove("disabled-button")
        document.getElementById("submission-button").disabled = false
        changeCallout("success-callout", "Success! Scroll down to see results")
    }
}
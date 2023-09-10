import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {ResponsiveLine} from "@nivo/line";
import {Button} from "react-bootstrap";
import {CSVLink} from "react-csv";
import domtoimage from "dom-to-image";
import {saveAs} from "file-saver";
import XMLExport from "../../../XMLExport";

function SimpleGraphData(props) {
    const [finalData, setFinalData] = useState([]);
    const [sensorNum, setSensorNum] = useState("");
    const [rowData, setrowData] = useState([]);
    const [headers, setheaders] = useState([
        {label: "TimeStamp", key: "timestamp"},
        {label: props.graphs + "_Avg_Vio_450nm", key: "vio"},
        {label: props.graphs + "_Avg_Blu_500nm", key: "blu"},
        {label: props.graphs + "_Avg_Grn_550nm", key: "grn"},
        {label: props.graphs + "_Avg_Yel_570nm", key: "yel"},
        {label: props.graphs + "_Avg_Org_600nm", key: "org"},
        {label: props.graphs + "_Avg_Red_650nm", key: "red"},
    ]);

    const fieldsAsObjects = {
        timestamp: "Date column header",
        vio: "vio column header",
        blu: "blue column header",
        grn: "green column header",
        yel: "yelloow column header",
        org: "orange data column header",
        red: "red data column header",
    };

    const isDashboard = false;
    let dataType;
    const graphId = "graph-container" + sensorNum;

    const VioPoint = [props.dataType + "_Avg_Vio_450nm"];
    const BluPoint = [props.dataType + "_Avg_Blu_500nm"];
    const GrnPoint = [props.dataType + "_Avg_Grn_550nm"];
    const YelPoint = [props.dataType + "_Avg_Yel_570nm"];
    const OrgPoint = [props.dataType + "_Avg_Org_600nm"];
    const RedPoint = [props.dataType + "_Avg_Red_650nm"];

    const colorsNivo = {
        Vio: "violet",
        Blu: "blue",
        Grn: "green",
        Yel: "yellow",
        Org: "orange",
        Red: "red",
    };

    if (props.dataType === "Cal") {
        dataType = "Calibrated";
    } else if (props.dataType === "Raw") {
        dataType = "Raw";
    }

    function handleExportImage() {
        const graphContainer = document.getElementById(
            "graph-container" + sensorNum
        );
        domtoimage
            .toBlob(graphContainer)
            .then((blob) => {
                saveAs(blob, "graph.png");
            })
            .catch((error) => {
                console.error("Error exporting image:", error);
            });
    }

    function showGraphData() {
        const data = localStorage.getItem("mqttResponseDataNormalized");

        const parsedData = JSON.parse(data);
        setSensorNum(parsedData);
        //debugger;
        //console.log(parsedData[0], "this is parsed data");
        //console.log(props.index, "this is the index");
        //console.log(props, "these are the props");
        // debugger;
        const sampleLength = parsedData[props.index].Samples;
        setSensorNum(parsedData[props.index].Data_Point);

        let filteredData = [];

        const maindata = [
            {
                id: "Vio",
                data: [],
            },
            {
                id: "Blu",
                data: [],
            },
            {
                id: "Grn",
                data: [],
            },
            {
                id: "Yel",
                data: [],
            },
            {
                id: "Org",
                data: [],
            },
            {
                id: "Red",
                data: [],
            },
        ];

        //-----------------get all of the first points of the y axis----------------------------
        const firstYVioPoint = parsedData[props.index].Samples[0]?.[VioPoint];
        const firstYBluPoint = parsedData[props.index].Samples[0]?.[BluPoint];
        const firstYGrnPoint = parsedData[props.index].Samples[0]?.[GrnPoint];
        const firstYYelPoint = parsedData[props.index].Samples[0]?.[YelPoint];
        const firstYOrgPoint = parsedData[props.index].Samples[0]?.[OrgPoint];
        const firstYRedPoint = parsedData[props.index].Samples[0]?.[RedPoint];

        //-----------------apply a loop to save the data in an object----------------------------
        for (let i = 0; i < sampleLength.length; i++) {
            const time = parsedData[props.index].Samples[i].Time_Stamp.split("_")[1];
            // let datePart = time[0];
            // let timePart = time[1].replace(/-/g, ':');
            // let replacedTime = `${datePart} ${timePart}`;
            // console.log(replacedTime)
            const replacedTime = time.replace(/-/g, ":");

            const dataDateTime = dayjs(replacedTime, "HH:mm:ss");

            // const firstEntryData = parsedData[props.index].Samples[0].Time_Stamp.split("_")[0];
            // const lastEntryData = parsedData[props.index].Samples[sampleLength.length - 1].Time_Stamp.split("_")[0];

            //logic for check if the Min Time is Greater than the Max Time
            let formattedXMinValue = dayjs(props.xMinValue, 'YYYY-MM-DD_HH-mm-ss');
            let formattedMinDateTime
            if (formattedXMinValue.isAfter(dayjs(props.xMaxValue, 'YYYY-MM-DD_HH-mm-ss'))) {
                formattedXMinValue = formattedXMinValue.subtract(1, 'day');
                formattedMinDateTime = dataDateTime.subtract(1, 'day');
            }

            // Check if the hour of formattedMinDateTime is 0 (midnight)
            // if (formattedMinDateTime.hour() === 0 && !hasLoggedMidnight) {
            //   formattedMinDateTime = formattedMinDateTime.add(1, 'day');
            //   // console.log(formattedMinDateTime, 'formatted date time');
            //   hasLoggedMidnight = true
            // }else{
            //   formattedMinDateTime = dataDateTime
            // }

            if ((formattedMinDateTime >= formattedXMinValue && dataDateTime <= props.xMaxValue)) {
                console.log(dataDateTime, "dataDateTime")
                console.log(props.xMaxValue, "x max")
                console.log(true)
                console.log(formattedMinDateTime, "formated dataDateTime")
                console.log(formattedXMinValue, "x min")
            }

            // if (formattedMinDateTime >= formattedXMinValue && dataDateTime <= props.xMaxValue) {
            if (dataDateTime >= formattedXMinValue && dataDateTime <= props.xMaxValue) {

                let row = {
                    timestamp: time.toString(),
                    vio: parsedData[props.index].Samples[i]?.[VioPoint],
                    blu: parsedData[props.index].Samples[i]?.[BluPoint],
                    grn: parsedData[props.index].Samples[i]?.[GrnPoint],
                    yel: parsedData[props.index].Samples[i]?.[YelPoint],
                    org: parsedData[props.index].Samples[i]?.[OrgPoint],
                    red: parsedData[props.index].Samples[i]?.[RedPoint],
                };
                let Yaxis;
                if (props.isNrm) {
                    Yaxis = {
                        Vio: parsedData[props.index].Samples[i]?.[VioPoint] / firstYVioPoint - 1,
                        Blu: parsedData[props.index].Samples[i]?.[BluPoint] / firstYBluPoint - 1,
                        Grn: parsedData[props.index].Samples[i]?.[GrnPoint] / firstYGrnPoint - 1,
                        Yel: parsedData[props.index].Samples[i]?.[YelPoint] / firstYYelPoint - 1,
                        Org: parsedData[props.index].Samples[i]?.[OrgPoint] / firstYOrgPoint - 1,
                        Red: parsedData[props.index].Samples[i]?.[RedPoint] / firstYRedPoint - 1,
                    };
                } else {
                    Yaxis = {
                        Vio: parsedData[props.index].Samples[i]?.[VioPoint],
                        Blu: parsedData[props.index].Samples[i]?.[BluPoint],
                        Grn: parsedData[props.index].Samples[i]?.[GrnPoint],
                        Yel: parsedData[props.index].Samples[i]?.[YelPoint],
                        Org: parsedData[props.index].Samples[i]?.[OrgPoint],
                        Red: parsedData[props.index].Samples[i]?.[RedPoint],
                    };
                }

                const text = [
                    {
                        data: [
                            {
                                x: replacedTime,
                                y: Yaxis.Vio,
                            },
                        ],
                    },
                    {
                        data: [
                            {
                                x: replacedTime,
                                y: Yaxis.Blu,
                            },
                        ],
                    },
                    {
                        data: [
                            {
                                x: replacedTime,
                                y: Yaxis.Grn,
                            },
                        ],
                    },
                    {
                        data: [
                            {
                                x: replacedTime,
                                y: Yaxis.Yel,
                            },
                        ],
                    },
                    {
                        data: [
                            {
                                x: replacedTime,
                                y: Yaxis.Org,
                            },
                        ],
                    },
                    {
                        data: [
                            {
                                x: replacedTime,
                                y: Yaxis.Red,
                            },
                        ],
                    },
                ];
                // console.log(Yaxis, "this is value for normalized");

                setrowData((current) => [...current, row]);
                for (let i = 0; i <= 5; i++) {
                    maindata[i]?.data.push(text[i]?.data[0]);
                    filteredData = maindata.filter(
                        (item) =>
                            // console.log(item.data[i]?.y, "this is the item"),
                            item.data[i]?.y >= props.yMinValue &&
                            item.data[i]?.y <= props.yMaxValue
                    );
                }

                // console.log("====================================");
                // console.log(maindata, "this is updatedPoints at", i);
                // console.log("====================================");

            }
        }

        setFinalData(filteredData);
    }

    useEffect(() => {
        showGraphData();
    }, []);

    const csvReport = {
        data: rowData,
        headers: headers,
        xsd_filename: dataType + "data_P" + sensorNum + ".xml",
        filename: dataType + "data_P" + sensorNum + ".csv",
    };

    const graphHeadingText = props.isNrm
        ? `${dataType} data : Normalized P${sensorNum} Graph`
        : `${dataType} data : P${sensorNum} Graph`;

    return (
        <div>
            <h3 style={{marginTop: 90, textAlign: "center"}}>
                {graphHeadingText}
            </h3>

            <Button type="submit" className="mx-2 menu-btn menu-btn1">
                <CSVLink {...csvReport}>Export Data to CSV</CSVLink>
            </Button>

            <Button
                type="submit"
                className="mx-2 menu-btn menu-btn2"
                onClick={handleExportImage}
            >
                Export Image
            </Button>
            <XMLExport
                data={rowData}
                fields={fieldsAsObjects}
                fileName={csvReport.xsd_filename}
            />
            <div id={"graph-container" + sensorNum} style={{height: "60vh", width: '100%'}}>
                <ResponsiveLine
                    // {...console.log(finalData, "this is final data")}
                    data={finalData}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: "grey",
                                },
                            },
                            legend: {
                                text: {
                                    fill: "grey",
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: "grey",
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: "grey",
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: "grey",
                            },
                        },
                        tooltip: {
                            container: {
                                color: "grey",
                            },
                        },
                    }}
                    colors={({id}) => colorsNivo[id]}
                    margin={{top: 50, right: 110, bottom: 50, left: 60}}
                    xScale={{type: "point"}}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: false,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 7,
                        tickPadding: 5,
                        tickRotation: 40,
                        legend: isDashboard ? undefined : "Time", // added
                        legendOffset: 46,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickValues: 5, // added
                        tickSize: 7,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: isDashboard ? undefined : "Value", // added
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={8}
                    pointColor={{theme: "background"}}
                    pointBorderWidth={2}
                    pointBorderColor={{from: "serieColor"}}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default SimpleGraphData;

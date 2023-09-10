import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import TextFields from "./components/axis-text-fields";
import DataTypeSelect from "./components/dataType";
import SimpleGraphData from "./graphs/simpleGraphData";
import WaveLengthGraphData from "./graphs/WavelengthData";
import Groups from "./groups/groups";
import Sensors from "./components/sensors";
import CustomFavNameDialog from "./groups/customFav";
import { baseApiUrl } from "../../../../../config";
import dayjs from "dayjs";
import WaveTypeSelect from "./components/waveType";
import { fetchPostReq } from "../../../../../services/restService";
import Spinner from "../../../../shared/spinner";

function BuildReportGraph() {
  // const get_graph_data = baseApiUrl + "/api/get_graph_meta_data";
  const save_fav_setting = baseApiUrl + "/api/save_fav_setting";

  const [sensor, setSensor] = useState([]);
  const [dataType, setDataType] = useState();
  const [isNrm, setIsNrm] = useState();
  const [waveType, setWaveType] = useState();
  const [checkResponse, setCheckResponse] = useState(false);
  const [renderGraphData, setRenderGraphData] = useState();
  const [graphName, setGraphName] = useState();
  const [minTime, setMinTime] = useState();
  const [maxTime, setMaxTime] = useState();
  const [minYValue, setMinYValue] = useState();
  const [maxYValue, setMaxYValue] = useState();
  const [selectedGroupId, setselectedGroupId] = useState();
  const [isCutomSetting, setIsCutomSetting] = useState(false);
  const [customSettingName, setCustomSettingName] = useState("");
  const [favList, setFavList] = useState();
  const [gfsid, setGfsid] = useState();
  const [settingsButtonClicked, setsettingsButtonClicked] = useState(false);
  const [newCustomListAdded, setNewCustomListAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //-------------------variable to use when All waveType is selected-------------------------
  const allWaveSelected = ["Vio", "Blu", "Grn", "Yel", "Org", "Red"];

  //-------------------functions to get values form childs ----------------------------------
  function getSensorsClicked(value) {
    setSensor(value);
    resetChart();
  }

  function getWaveTypeClicked(value) {
    setWaveType(value);
    // console.log(value, "wave type clicked");
    resetChart();
  }

  function getDataTypeClicked(dataType, isNrm) {
    setDataType(dataType);
    setIsNrm(isNrm);
    console.log(dataType, "is data type with normalized", isNrm);
    resetChart();
  }

  function getMinTime(value) {
    setMinTime(value);
    resetChart();
  }

  function getMaxTime(value) {
    setMaxTime(value);
    resetChart();
  }

  function getMinYValue(value) {
    setMinYValue(value);
    // console.log(value,"this is the y min value");
    resetChart();
  }

  function getMaxYValue(value) {
    setMaxYValue(value);
    // console.log(value, "this is the y max value");
    resetChart();
  }

  function getGroupId(value) {
    setselectedGroupId(value);
    resetChart();
  }

  function getCustomSettingName(value) {
    setCustomSettingName(value);
    // console.log(value, "this is custom setting");
    resetChart();
  }

  function setFavSetting() {
    setsettingsButtonClicked(true);
    resetChart();
  }

  function settingButtonFalse() {
    setsettingsButtonClicked(false);
  }

  function listAdded() {
    setNewCustomListAdded(true);
    resetChart();
  }

  function listAddedFalse() {
    setNewCustomListAdded(false);
  }

  function getFavList(value) {
    setFavList(value);
    if (value !== "custom") {
      setIsCutomSetting(false);
    } else {
      setIsCutomSetting(true);
    }
    resetChart();
  }

  // function getFavList(value) {
  //   setFavList(value);
  //   if (value !== "custom") {
  //     setIsCutomSetting(false);
  //   } else {
  //     setIsCutomSetting(true);
  //   }
  // }

  function requestData() {
    const requestJson = {
      CSVfileID: 3,
      Data_Point: sensor[0],
      // Rack_Num: 1,
    };
    console.log(requestJson, "this is data request");

    getFilteredData(requestJson.Data_Point);
    setIsLoading(true);

    setRenderGraphData(sensor[0]);
    setGraphName(dataType);
    // console.log(minTime, "this is min value");
    resetChart();
    checkData();
  }

  function getFilteredData(reqObj) {
    const allGraphReport = JSON.parse(localStorage.getItem("allGraphReport"));

    // Check if the data exists and is an array
    if (!Array.isArray(allGraphReport)) {
      console.error("Invalid data in localStorage");
      return [];
    }

    // Filter the data based on the given sensors
    const filteredData = allGraphReport.filter((item) =>
      reqObj.includes(item.Data_Point)
    );
    localStorage.setItem(
      "mqttResponseDataNormalized",
      JSON.stringify(filteredData)
    );
  }

  function checkData() {
    if (localStorage.getItem("mqttResponseDataNormalized")) {
      setCheckResponse(true);
      setIsLoading(false);
      console.log("====================================");
      console.log(checkResponse, "condition is true");
      console.log("====================================");
    } else {
      console.error("Error");
    }
  }

  useEffect(() => {
    console.log(checkResponse, "check Response is changed");
  }, [checkResponse]);

  function resetChart() {
    setCheckResponse(false);
  }

  const customSettingsObject = async () => {
    //-----------setting the dataType object in custom favList-------------------
    let type = {};
    switch (dataType) {
      case "Raw":
        type = {
          Raw: true,
          Cal: false,
          Nrm: false,
        };
        break;
      case "Cal":
        type = {
          Raw: false,
          Cal: true,
          Nrm: false,
        };
        break;
      default:
        break;
    }

    switch (isNrm) {
      case true:
        type = {
          Raw: false,
          Cal: false,
          Nrm: true,
        };
        break;
      default:
        break;
    }

    //-----------setting the waveType object in custom favList-------------------

    let wave = {
      Wavelength: [
        {
          ALL: false,
        },
        {
          Vio: false,
          Blu: false,
          Grn: false,
          Red: false,
          Yel: false,
          Org: false,
        },
      ],
    };

    if (waveType === "All") {
      wave.Wavelength[0].ALL = true;
    } else {
      wave.Wavelength[1][waveType] = true;
      console.log(wave.Wavelength[1][waveType], " rhid id slec");
    }

    const data = {
      GroupID: selectedGroupId,
      Fav_setting_name: customSettingName,
      Wells: sensor,
      ScaleGraph: {
        xaxis: {
          Min: dayjs(minTime).format("HH:mm:ss"),
          Max: dayjs(maxTime).format("HH:mm:ss"),
        },
        yaxis: {
          Min: minYValue,
          Max: maxYValue,
        },
      },
      Data: type,
      Wavelength: wave.Wavelength,
    };

    //---------- save custom object -----------

    const result = await fetchPostReq(save_fav_setting, data);

    listAdded();
    console.log(result, "this is the result from the API request");
  };

  useEffect(() => {
    document.title = "Build Report";
  }, []);

  return (
    <>
      <div style={{padding: '50px', width: '71%'}}>
        <div>
          <Container>
            <Card className="text-center border-0 ">
              <Card.Body>
                {" "}
                <Card.Title className="text-green text-center justify-content-center text-uppercase font-38">
                  Graph Report
                </Card.Title>
                <Card.Text className="mx-auto mb-4" style={{ width: "40rem" }}>
                  Get Multiple Sensor Data With Normalized Data
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
          <Container>
            <Row>
              <div className="col-md-3">
                <Groups
                  getGroupId={getGroupId}
                  getFavList={getFavList}
                  setFavSetting={setFavSetting}
                  listAdded={newCustomListAdded}
                  listAddedFalse={listAddedFalse}
                  // getGroupName ={}
                />
              </div>
              <div className="col-md-9" style={{ backgroundColor: "#2484ac" }}>
                <Row className="border-bottom border-warning">
                  <Col className="p-3 mt-2 align-self-center ">
                    <h4 className="color-yellow">Wells</h4>
                  </Col>
                  <Col
                    className="p-3"
                    style={{ borderLeft: "1px solid #ffc107" }}
                  >
                    <Row>
                      <Col className="text-center pe-4">
                        <Row className="text-warning">
                          <span>X-axis</span>
                        </Row>
                        <Row className="text-white">
                          <Col>
                            <span>Min</span>
                          </Col>
                          <Col>
                            <span>Max</span>
                          </Col>
                        </Row>
                      </Col>
                      <Col className="text-center pe-4">
                        <Row className="text-warning">
                          <span>Y-axis</span>
                        </Row>
                        <Row className="text-white">
                          <Col>
                            <span>Min</span>
                          </Col>
                          <Col>
                            <span>Max</span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col
                    className="p-3 col-md-6"
                    style={{ borderRight: "1px solid #ffc107" }}
                  >
                    <Sensors
                      getSensors={getSensorsClicked}
                      settingsButtonClicked={settingsButtonClicked}
                      settingsButtonClickedFalse={settingButtonFalse}
                      listAdded={newCustomListAdded}
                      listAddedFalse={listAddedFalse}
                    />
                  </Col>
                  <Col className="py-3">
                    <TextFields
                      getMaxTime={getMaxTime}
                      getMinTime={getMinTime}
                      getMinYValue={getMinYValue}
                      getMaxYValue={getMaxYValue}
                      settingsButtonClicked={settingsButtonClicked}
                      settingsButtonClickedFalse={settingButtonFalse}
                      listAdded={newCustomListAdded}
                      listAddedFalse={listAddedFalse}
                    />
                  </Col>
                </Row>
              </div>
            </Row>
          </Container>
          <Container style={{ backgroundColor: "#2484ac" }}></Container>
          <Container className="mt-5" style={{ backgroundColor: "#2484ac" }}>
            <Row>
              <Col className="p-3 mt-2 col-md-6 align-self-center">
                <h5 className="text-white">Data Type:</h5>
              </Col>
              <Col className="py-3" style={{ borderLeft: "1px solid #ffc107" }}>
                <DataTypeSelect
                  getDataType={getDataTypeClicked}
                  settingsButtonClicked={settingsButtonClicked}
                  settingsButtonClickedFalse={settingButtonFalse}
                  listAdded={newCustomListAdded}
                  listAddedFalse={listAddedFalse}
                />
              </Col>
            </Row>
          </Container>
          <Container className="mt-5" style={{ backgroundColor: "#2484ac" }}>
            <Row>
              <Col className="p-3 mt-2 col-md-6 align-self-center">
                <h5 className="text-white">Wave Type:</h5>
              </Col>
              <Col className="py-3" style={{ borderLeft: "1px solid #ffc107" }}>
                <WaveTypeSelect
                  getWaveType={getWaveTypeClicked}
                  settingsButtonClicked={settingsButtonClicked}
                  settingsButtonClickedFalse={settingButtonFalse}
                  listAdded={newCustomListAdded}
                  listAddedFalse={listAddedFalse}
                />
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="text-center mt-5">
              {/* <Col>
                <Button
                  type="submit"
                  className="mx-2 menu-btn menu-btn1"
                  onClick={() => {
                    requestData();
                  }}
                >
                  Build Graph
                </Button>
              </Col> */}
              <Col>
                <Button type="submit" className="mx-2 menu-btn menu-btn1">
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="mx-2 menu-btn menu-btn2"
                  onClick={requestData}
                >
                  Show Graph
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="mx-2 menu-btn menu-btn1"
                  onClick={() => {
                    customSettingsObject();
                  }}
                >
                  Save Settings
                </Button>
                {isCutomSetting && (
                  <CustomFavNameDialog
                    getCustomSettingName={getCustomSettingName}
                  />
                )}
              </Col>
            </Row>
          </Container>
          {/*
          <Row
            // className="graph-grid"
            style={{overflowX: 'auto', display: 'flex', flexWrap: "nowrap"}}
          > */}
            {checkResponse &&
              renderGraphData.map(
                (item, index) => (
                  console.log(renderGraphData, "this is the index"),
                  (
                    // <Col md={12}>
                      <SimpleGraphData
                        key={index}
                        dataType={graphName}
                        isNrm={isNrm}
                        xMinValue={minTime}
                        xMaxValue={maxTime}
                        yMinValue={minYValue}
                        yMaxValue={maxYValue}
                        resetChart={resetChart}
                        index={index}
                      />
                    // </Col>
                  )
                )
              )}

            {isLoading ? (
              <Spinner loading={isLoading} />
            ) : waveType == "All" ? (
              checkResponse &&
              allWaveSelected.map((wavevalue, index) => (
                // <Col md={12}>
                  <WaveLengthGraphData
                    dataType={dataType}
                    wave={wavevalue}
                    isNrm={isNrm}
                    xMinValue={minTime}
                    xMaxValue={maxTime}
                    yMinValue={minYValue}
                    yMaxValue={maxYValue}
                    yValueLoop={sensor}
                    key={index}
                  />
                // </Col>
              ))
            ) : (
              checkResponse && (
                // <Col md={12}>
                  <WaveLengthGraphData
                    dataType={dataType}
                    isNrm={isNrm}
                    wave={waveType}
                    xMinValue={minTime}
                    xMaxValue={maxTime}
                    yMinValue={minYValue}
                    yMaxValue={maxYValue}
                    yValueLoop={[waveType]}
                  />
                // </Col>
              )
            )}
          {/* </Row> */}
        </div>
      </div>
    </>
  );
}

export default BuildReportGraph;

import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";

function Table(props) {
  let initialData = {
    A: ["", "", "", "", "", "", "", "", "", ""],
    A_OD: ["", "", "", "", "", "", "", "", "", ""],
    A_post: ["", "", "", "", "", "", "", "", "", ""],
    B: ["", "", "", "", "", "", "", "", "", ""],
    B_OD: ["", "", "", "", "", "", "", "", "", ""],
    B_post: ["", "", "", "", "", "", "", "", "", ""],
    C: ["", "", "", "", "", "", "", "", "", ""],
    C_OD: ["", "", "", "", "", "", "", "", "", ""],
    C_post: ["", "", "", "", "", "", "", "", "", ""],
  };

  if(props.setTableData.table){
    initialData = {
      A: props.setTableData?.table?.A ,
      A_post: props.setTableData?.table.A_pre ,
      B: props.setTableData?.table?.B ,
      B_post: props.setTableData?.table.B_pre ,
      C: props.setTableData?.table?.C ,
      C_post: props.setTableData?.table.C_pre ,
    };
  }

  const [tableData, setTableData] = useState(initialData);

  const [jsonData, setJsonData] = useState([]);

  // let pointA, pointA_pre, pointB, pointB_pre, pointC, pointC_pre;

  // console.log('====================================');
  // console.log(initialData);
  // console.log('====================================');
  useEffect(() => {
    const data = getTableData();
    if (props.getJson) {
      props.getTable(data);
    }
    props.stopJson();
  }, [props.getJson]);

  function handleInputChange(event, key, index) {
    const { value } = event.target;
    setTableData((prevState) => ({
      ...prevState,
      [key]: prevState[key].map((item, i) => (i === index ? value : item)),
    }));
  }

  function getTableData() {
    const data = [
      // localStorage.getItem("GFSID"),
      {
        A: [
          document.getElementById("A0").value,
          document.getElementById("A1").value,
          document.getElementById("A2").value,
          document.getElementById("A3").value,
          document.getElementById("A4").value,
          document.getElementById("A5").value,
          document.getElementById("A6").value,
          document.getElementById("A7").value,
          document.getElementById("A8").value,
          document.getElementById("A9").value,
        ],
      },
      {
        "A-OD": [
          document.getElementById("A-od-0").value,
          document.getElementById("A-od-1").value,
          document.getElementById("A-od-2").value,
          document.getElementById("A-od-3").value,
          document.getElementById("A-od-4").value,
          document.getElementById("A-od-5").value,
          document.getElementById("A-od-6").value,
          document.getElementById("A-od-7").value,
          document.getElementById("A-od-8").value,
          document.getElementById("A-od-9").value,
        ],
      },
      {
        "A-post-Notes": [
          document.getElementById("A-post-0").value,
          document.getElementById("A-post-1").value,
          document.getElementById("A-post-2").value,
          document.getElementById("A-post-3").value,
          document.getElementById("A-post-4").value,
          document.getElementById("A-post-5").value,
          document.getElementById("A-post-6").value,
          document.getElementById("A-post-7").value,
          document.getElementById("A-post-8").value,
          document.getElementById("A-post-9").value,
        ],
      },
      {
        B: [
          document.getElementById("B0").value,
          document.getElementById("B1").value,
          document.getElementById("B2").value,
          document.getElementById("B3").value,
          document.getElementById("B4").value,
          document.getElementById("B5").value,
          document.getElementById("B6").value,
          document.getElementById("B7").value,
          document.getElementById("B8").value,
          document.getElementById("B9").value,
        ],
      },
      {
        "B-OD": [
          document.getElementById("B-od-0").value,
          document.getElementById("B-od-1").value,
          document.getElementById("B-od-2").value,
          document.getElementById("B-od-3").value,
          document.getElementById("B-od-4").value,
          document.getElementById("B-od-5").value,
          document.getElementById("B-od-6").value,
          document.getElementById("B-od-7").value,
          document.getElementById("B-od-8").value,
          document.getElementById("B-od-9").value,
        ],
      },
      {
        "B-post-Notes": [
          document.getElementById("B-post-0").value,
          document.getElementById("B-post-1").value,
          document.getElementById("B-post-2").value,
          document.getElementById("B-post-3").value,
          document.getElementById("B-post-4").value,
          document.getElementById("B-post-5").value,
          document.getElementById("B-post-6").value,
          document.getElementById("B-post-7").value,
          document.getElementById("B-post-8").value,
          document.getElementById("B-post-9").value,
        ],
      },
      {
        C: [
          document.getElementById("C0").value,
          document.getElementById("C1").value,
          document.getElementById("C2").value,
          document.getElementById("C3").value,
          document.getElementById("C4").value,
          document.getElementById("C5").value,
          document.getElementById("C6").value,
          document.getElementById("C7").value,
          document.getElementById("C8").value,
          document.getElementById("C9").value,
        ],
      },
      {
        "C-OD": [
          document.getElementById("C-od-0").value,
          document.getElementById("C-od-1").value,
          document.getElementById("C-od-2").value,
          document.getElementById("C-od-3").value,
          document.getElementById("C-od-4").value,
          document.getElementById("C-od-5").value,
          document.getElementById("C-od-6").value,
          document.getElementById("C-od-7").value,
          document.getElementById("C-od-8").value,
          document.getElementById("C-od-9").value,
        ],
      },
      {
        "C-post-Notes": [
          document.getElementById("C-post-0").value,
          document.getElementById("C-post-1").value,
          document.getElementById("C-post-2").value,
          document.getElementById("C-post-3").value,
          document.getElementById("C-post-4").value,
          document.getElementById("C-post-5").value,
          document.getElementById("C-post-6").value,
          document.getElementById("C-post-7").value,
          document.getElementById("C-post-8").value,
          document.getElementById("C-post-9").value,
        ],
      },
    ];
    return data;
  }

  return (
    <div
      className="table-responsive"
      style={{
        overflow: "auto",
        fontFamily: "Corbel",
        marginTop: "-2px",
        marginInline: "20px",
        width: "96%",
      }}
    >
      <table className="sample-details" style={{ width: "100%" }}>
        <thead>
          <tr className="one">
            <th></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
          </tr>
        </thead>
        <tbody>
          {/* row 2 */}
          <tr className="color_yel sampleTableDataRows">
            <td>
              <b className="bold-text">A</b>
            </td>
            {tableData.A.map((item, index) => {
              return (
                <td key={index}>
                  <input
                    id={"A" + index}
                    value={item}
                    type="text"
                    className="form-control"
                    onChange={(e) => handleInputChange(e, "A", index)}
                  />
                </td>
              );
            })}
          </tr>
          {/* row 2 */}
          <tr className="color_yel sampleTableDataRows">
            <td>
              <b className="bold-text">A – OD</b>
            </td>
            <td>
              <input id="A-od-0" type="text" className="form-control" />
            </td>
            <td>
              <input id="A-od-1" type="text" className="form-control" />
            </td>
            <td>
              <input id="A-od-2" type="text" className="form-control" />
            </td>
            <td>
              <input id="A-od-3" type="text" className="form-control" />
            </td>
            <td>
              <input id="A-od-4" type="text" className="form-control" />
            </td>
            <td>
              <input id="A-od-5" type="text" className="form-control" />
            </td>
            <td>
              <input id="A-od-6" type="text" className="form-control" />
            </td>
            <td>
              <input id="A-od-7" type="text" className="form-control" />
            </td>
            <td>
              <input id="A-od-8" type="text" className="form-control" />
            </td>
            <td>
              <input id="A-od-9" type="text" className="form-control" />
            </td>
          </tr>
          {/* row 3 */}
          <tr className="color_yel sampleTableDataRows">
            <td>
              <b className="bold-text">A –post Notes</b>
            </td>
            {tableData.A_post.map((item, index) => {
              return (
                <td key={index}>
                  <input
                    id={"A-post-" + index}
                    value={item}
                    type="text"
                    className="form-control"
                    onChange={(e) => handleInputChange(e, "A_post", index)}
                  />
                </td>
              );
            })}
          </tr>
          {/* row 4 */}
          <tr className="color_blue sampleTableDataRows">
            <td>
              <b className="bold-text">B</b>
            </td>
            {tableData.B.map((item, index) => {
              return (
                <td key={index}>
                  <input
                    id={"B" + index}
                    value={item}
                    type="text"
                    className="form-control"
                    onChange={(e) => handleInputChange(e, "B", index)}
                  />
                </td>
              );
            })}
          </tr>
          {/* row 5 */}
          <tr className="color_blue sampleTableDataRows">
            <td>
              <b className="bold-text">B – OD</b>
            </td>
            <td>
              <input id="B-od-0" type="text" className="form-control" />
            </td>
            <td>
              <input id="B-od-1" type="text" className="form-control" />
            </td>
            <td>
              <input id="B-od-2" type="text" className="form-control" />
            </td>
            <td>
              <input id="B-od-3" type="text" className="form-control" />
            </td>
            <td>
              <input id="B-od-4" type="text" className="form-control" />
            </td>
            <td>
              <input id="B-od-5" type="text" className="form-control" />
            </td>
            <td>
              <input id="B-od-6" type="text" className="form-control" />
            </td>
            <td>
              <input id="B-od-7" type="text" className="form-control" />
            </td>
            <td>
              <input id="B-od-8" type="text" className="form-control" />
            </td>
            <td>
              <input id="B-od-9" type="text" className="form-control" />
            </td>
          </tr>
          {/* row 6 */}
          <tr className="color_blue sampleTableDataRows">
            <td>
              <b className="bold-text">B –post Notes</b>
            </td>

            {tableData.B_post.map((item, index) => {
              return (
                <td key={index}>
                  <input
                    id={"B-post-" + index}
                    value={item}
                    type="text"
                    className="form-control"
                    onChange={(e) => handleInputChange(e, "B_post", index)}
                  />
                </td>
              );
            })}
          </tr>
          {/* row 7 */}
          <tr className="color_yel sampleTableDataRows">
            <td>
              <b className="bold-text">C</b>
            </td>
            {tableData.C.map((item, index) => {
              return (
                <td key={index}>
                  <input
                    id={"C" + index}
                    value={item}
                    type="text"
                    className="form-control"
                    onChange={(e) => handleInputChange(e, "C", index)}
                  />
                </td>
              );
            })}
          </tr>
          {/* row 8 */}
          <tr className="color_yel sampleTableDataRows">
            <td>
              <b className="bold-text">C – OD</b>
            </td>
            <td>
              <input id="C-od-0" type="text" className="form-control" />
            </td>
            <td>
              <input id="C-od-1" type="text" className="form-control" />
            </td>
            <td>
              <input id="C-od-2" type="text" className="form-control" />
            </td>
            <td>
              <input id="C-od-3" type="text" className="form-control" />
            </td>
            <td>
              <input id="C-od-4" type="text" className="form-control" />
            </td>
            <td>
              <input id="C-od-5" type="text" className="form-control" />
            </td>
            <td>
              <input id="C-od-6" type="text" className="form-control" />
            </td>
            <td>
              <input id="C-od-7" type="text" className="form-control" />
            </td>
            <td>
              <input id="C-od-8" type="text" className="form-control" />
            </td>
            <td>
              <input id="C-od-9" type="text" className="form-control" />
            </td>
          </tr>
          {/* row 9 */}
          <tr className="color_yel sampleTableDataRows">
            <td>
              <b className="bold-text">C –post Notes</b>
            </td>
            {tableData.C_post.map((item, index) => {
              return (
                <td key={index}>
                  <input
                    id={"C-post-" + index}
                    value={item}
                    type="text"
                    className="form-control"
                    onChange={(e) => handleInputChange(e, "C_post", index)}
                  />
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;

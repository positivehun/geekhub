import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./css/Dropdown.css";
import { apiInstance } from "../../api/index";
import Datepicker from "./Datepicker";
import cityJson from "../Kakaomap/city.json";
import schoolJson from "../Kakaomap/school.json";
import Button from "@mui/material/Button";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

const UpdateDropdown = (props) => {
  const updateSelected = props.updateSelected;
  const setUpdateSelected = props.setUpdateSelected;

  const [schoolList, setSchoolList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [hourList, setHourList] = useState([]);
  const [minList, setMinList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [state, setState] = useState({
    center: { lat: 35.19919101818564, lng: 126.87300478078876 },
    isPanto: false,
    level: 7,
  });
  const [preSchool, setPreSchool] = useState("");
  const [preCity, setPreCity] = useState("");
  useEffect(() => {
    console.log(updateSelected);
    for (let i = 0; i < cityJson.length; i++) {
      if (cityJson[i].localCity == updateSelected.localCity) {
        setState((prev) => {
          return {
            ...prev,
            center: {
              lat: cityJson[i].center.lat,
              lng: cityJson[i].center.lng,
            },
            level: cityJson[i].level,
          };
        });
        if (preSchool == updateSelected.localSchool) {
          break;
        }
        for (let j = 0; j < schoolJson.length; j++) {
          if (schoolJson[j].localSchool == updateSelected.localSchool) {
            console.log(updateSelected.localSchool);
            setState((prev) => {
              return {
                ...prev,
                center: {
                  lat: schoolJson[j].center.lat,
                  lng: schoolJson[j].center.lng,
                },
                level: schoolJson[j].level,
              };
            });
            setPreSchool(updateSelected.localSchool);
            setPreCity(updateSelected.localCity);
            break;
          }
        }
        setPreSchool(updateSelected.localSchool);
        setPreCity(updateSelected.localCity);
        break;
      }
    }
  }, [updateSelected]);

  useEffect(() => {
    if (updateSelected.localCity && updateSelected.localSchool) {
      async function getUser() {
        const res = await apiInstance().post("spot/current", updateSelected);
        let result = [];
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i];
          if (item.userName != null) {
            result.push(item);
          }
        }
        setDriverList(result);
      }
      getUser();
    }
  }, [updateSelected]);
  useEffect(() => {
    let result = [];
    for (let i = 0; i < 24; i++) {
      result.push(i);
    }
    setHourList(result);
    result = [];
    for (let i = 0; i < 60; i++) {
      result.push(i);
    }
    setMinList(result);
    result = [];
    result.push("STORE");
    result.push("DESTINATION");
    result.push("HUB");
    setCategoryList(result);
  }, []);

  const onChange = (e) => {
    // console.log(e);

    const nextInfo = {
      ...updateSelected,
      [e.target.name]: e.target.value,
    };
    setUpdateSelected(nextInfo);

    if (nextInfo.localCity === "??????") {
      setSchoolList(schoolSeoul);
    } else if (nextInfo.localCity === "??????") {
      setSchoolList(schoolGwangju);
    } else if (nextInfo.localCity === "??????") {
      setSchoolList(schoolSuwon);
    } else if (nextInfo.localCity === "??????") {
      setSchoolList(schoolIncheon);
    }
  };
  const schoolSeoul = [
    "???????????????",
    "???????????????",
    "????????????????????????",
    "?????????????????????",
    "???????????????",
    "?????????????????????",
    "???????????????",
    "?????????????????????",
    "????????????????????????",
    "????????????????????????",
    "???????????????",
  ];
  const schoolSuwon = ["??????????????????(?????????????????????)"];
  const schoolIncheon = ["?????? ??????????????????", "???????????????(??????)"];
  const schoolGwangju = ["?????????????????????", "???????????????", "SSAFY"];
  return (
    <div className="dropdown">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-standard-label">??????</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={updateSelected.localCity}
          onChange={(e) => {
            onChange(e);
            setUpdateSelected((prev) => {
              return {
                ...prev,
                localSchool: "",
              };
            });
          }}
          label="??????"
          name="localCity"
        >
          <MenuItem value={"??????"}>??????</MenuItem>
          <MenuItem value={"??????"}>??????</MenuItem>
          <MenuItem value={"??????"}>??????</MenuItem>
          <MenuItem value={"??????"}>??????</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">??????</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={updateSelected.localSchool}
          onChange={onChange}
          label="??????"
          name="localSchool"
        >
          {schoolList.map((localSchool) => (
            <MenuItem key={localSchool} value={localSchool}>
              {localSchool}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-standard-label">????????????</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={updateSelected.driver}
          onChange={(e) => {
            console.log(e);
            setUpdateSelected((prev) => {
              return {
                ...prev,
                driver: e.target.value,
              };
            });
            console.log(e.target.value);
          }}
          label="????????????"
          name="driver"
        >
          {driverList.map((d) => (
            <MenuItem key={d.userIdx} value={d.userName}>
              {d.userName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Datepicker selected={updateSelected} setSelected={setUpdateSelected} />
      <FormControl size="small" variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-standard-label">??????</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={updateSelected.hour}
          onChange={(e) => {
            setUpdateSelected((prev) => {
              return {
                ...prev,
                hour: e.target.value,
              };
            });
            console.log(e.target.value);
          }}
          label="??????"
          name="hour"
        >
          {hourList.map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        className="label"
        variant="standard"
        size="small"
        sx={{ m: 1, minWidth: 100 }}
      >
        <InputLabel id="demo-simple-select-standard-label">???</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={updateSelected.min}
          onChange={(e) => {
            setUpdateSelected((prev) => {
              return {
                ...prev,
                min: e.target.value,
              };
            });
            console.log(e.target.value);
          }}
          label="???"
          name="min"
          style={{ maxHeight: 300 }}
        >
          {minList.map((min) => (
            <MenuItem key={min} value={min}>
              {min}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        className="label1"
        variant="standard"
        size="small"
        sx={{ m: 1, minWidth: 100 }}
      >
        <InputLabel id="demo-simple-select-standard-label">??????</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={updateSelected.spotCategory}
          onChange={(e) => {
            setUpdateSelected((prev) => {
              return {
                ...prev,
                category: e.target.value,
              };
            });
          }}
          label="??????"
          name="category"
          style={{ maxHeight: 300 }}
        >
          {categoryList.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div class="col-3">
        <input
          class="effect-1"
          type="text"
          value={updateSelected.storename}
          placeholder="?????????"
          onChange={(e) => {
            setUpdateSelected((prev) => {
              return {
                ...prev,
                storename: e.target.value,
              };
            });
          }}
        />
        <span class="focus-border"></span>
      </div>
      <div class="col-3">
        <input
          class="effect-1"
          type="text"
          value={updateSelected.count}
          placeholder="??????"
          onChange={(e) => {
            setUpdateSelected((prev) => {
              return {
                ...prev,
                count: e.target.value,
              };
            });
          }}
        />
        <span class="focus-border"></span>
      </div>
      <div class="col-3">
        <input
          class="effect-1"
          type="text"
          placeholder="??????"
          value={updateSelected.lat}
          onChange={(e) => {
            setUpdateSelected((prev) => {
              return {
                ...prev,
                lat: e.target.value,
              };
            });
          }}
        />
        <span class="focus-border"></span>
      </div>

      <div class="col-3">
        <input
          class="effect-1"
          type="text"
          placeholder="??????"
          value={updateSelected.lng}
          onChange={(e) => {
            setUpdateSelected((prev) => {
              return {
                ...prev,
                lng: e.target.value,
              };
            });
          }}
        />
        <span class="focus-border"></span>
      </div>
      <Map
        center={state.center}
        level={state.level}
        style={{
          // ????????? ??????
          width: "100%",
          height: "450px",
        }}
        onClick={(_t, mouseEvent) =>
          setUpdateSelected((prev) => {
            return {
              ...prev,
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            };
          })
        }
      >
        {updateSelected && <MapMarker position={updateSelected} />}
      </Map>
    </div>
  );
};
export default UpdateDropdown;

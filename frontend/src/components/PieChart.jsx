import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAttendanceAction } from "../Redux/actions/user/userAction";
// import { Box } from "@mui/system";
// import { mockPieData as data } from "../data/mockData";

const PieChart = () => {
  const data = [];

  const { userLoginAttendance } = useSelector(
    (state) => state.userLoginAttendance
  );

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(userAttendanceAction());
  }, [dispatch])
  
  const overAll = userLoginAttendance && userLoginAttendance.reduce((total,key,i) => {
    // console.log((i+Math.random()*10+100));
    // console.log(i);
    data.push({
      id: `${Math.round((key.present / key.totalAttendance + Number.EPSILON) * 100)}%`,
      label: key.courseName,
      // value: Math.round((key.present / key.totalAttendance + Number.EPSILON) * 100) /100,
      value: Math.round((key.present / key.totalAttendance + Number.EPSILON) * 100),
      // color : "hsl(110, 100%, 50%)"
      color: `hsl(${(i+Math.random()*10+100)}, ${(i+Math.random()*100)}%, ${(i+Math.random()*100)}%)`,  
      // color: "red",  
    });
    // console.log(total);
    // if(i>=1){
    //   return ((total + Math.round((key.present / key.totalAttendance + Number.EPSILON) * 100))/2);
    // }else{
    //   return ((total + Math.round((key.present / key.totalAttendance + Number.EPSILON) * 100)))
    // }
    // console.log(total);
    if(!key.totalAttendance && !key.present){
      return total + 100;
    }else{
      return (total + Math.round(((key.present / key.totalAttendance) + Number.EPSILON) * 100));
    }
  },0);

  // console.log(overAll);
  // console.log(userLoginAttendance)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Typography position={"fixed"} variant="h2"
                  color={colors.blueAccent[400]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }} >      
        OverAll Percentage  : {Math.round(((overAll/data.length) + Number.EPSILON) * 100 )/100}%
      </Typography>
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          // color: "rgba(155, 155, 155, 0)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "left",
          direction: "column",
          justify: false,
          translateX: -50,
          translateY: 56,
          itemsSpacing: 10,
          itemWidth: 100,
          itemHeight: 30,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 14,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#fff",
              },
            },
          ],
        },
      ]}
    />
  </>
  );
};

export default PieChart;

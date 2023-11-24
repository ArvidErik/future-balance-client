import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";

function BalanceChart() {
  const theme = useTheme();

  return (
    <>
    <Typography variant="h4">
        Balace Overview
    </Typography>
    <ResponsiveLine
      data={[{
        "id": "japan",
        "color": "hsl(0, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 13
          },
          {
            "x": "helicopter",
            "y": 43
          },
          {
            "x": "boat",
            "y": 56
          },
          {
            "x": "train",
            "y": 89
          },
          {
            "x": "subway",
            "y": 115
          },
          {
            "x": "bus",
            "y": 134
          },
          {
            "x": "car",
            "y": 156
          },
          {
            "x": "moto",
            "y": 179
          },
          {
            "x": "bicycle",
            "y": 296
          },
          {
            "x": "horse",
            "y": 340
          },
          {
            "x": "skateboard",
            "y": -120
    
          },
          {
            "x": "others",
            "y": -200
          }
        ]
      }]}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={{ scheme: 'dark2' }}
      pointSize={10}
      enableGridX={false}
      enableGridY={false}
      areaOpacity={0.1}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      enableArea={true}
      areaBaselineValue={0}
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
</>
  );
}

export default BalanceChart;

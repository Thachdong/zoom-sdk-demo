import React, { useState, useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";

const crypto = require("crypto"); // crypto comes with Node.js

export default function Zoom({ meetingNumber }) {
  function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    return new Promise((res, rej) => {
      const timestamp = new Date().getTime() - 30000;
      const msg = Buffer.from(
        apiKey + meetingNumber + timestamp + role
      ).toString("base64");
      const hash = crypto
        .createHmac("sha256", apiSecret)
        .update(msg)
        .digest("base64");
      const signature = Buffer.from(
        `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
      ).toString("base64");

      res(signature);
    });
  }

  var apiKey = "7jgR7KkeSJGCAYlgcuDFCQ";
  var apiSecret = "u0nvB6m5wbLwl0SeE5sUWXFIyhs564xo1hTq";
  var leaveUrl = "http://localhost:3000";
  var userName = "WebSDK";
  var userEmail = "";
  var passWord = "";
  var signature = "";

  generateSignature(apiKey, apiSecret, meetingNumber, 0).then(
    (res) => (signature = res)
  );

  useEffect(() => {
    showZoomDiv();
    // ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.0/lib", "/av");
    const zoomJSLib = "https://source.zoom.us/1.9.9/lib";
    const zoomJSAVLib = "/av";
    ZoomMtg.setZoomJSLib(zoomJSLib, zoomJSAVLib);
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    initiateMeeting();
  }, [meetingNumber]);

  const showZoomDiv = () => {
    document.getElementById("zmmtg-root").style.display = "block";
  };

  const initiateMeeting = () => {
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  return <div>Zoom</div>;
}

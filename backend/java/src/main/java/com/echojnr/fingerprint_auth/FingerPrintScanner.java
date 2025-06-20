package com.echojnr.fingerprint_auth;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import SecuGen.FDxSDKPro.jni.JSGFPLib;
import SecuGen.FDxSDKPro.jni.SGFDxDeviceName;
import SecuGen.FDxSDKPro.jni.SGFDxSecurityLevel;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/fingerprint")
public class FingerPrintScanner {
	static String temp = "SO5X0A6qTnaRELIKLd1tgARsDlu5xs9B29KsB/QlXCXjLxlYe/a0tqvOSTwTHFQPlw38Og3mF3Z6fFrjFttk8Upz+oT/Nfzedda+BzW0Sk6kq5AzF/4z6QTa5ui0GfX1N53cusLVi9OWVRlx2D6YRHcSY/DxFWv0f0AQc/mO+eFlLfRt7+5tsTfawfMzcQJpGy3J668NX2AqZP9H8Gz5fBstyeuvDV9gKmT/R/Bs+XwbLcnrrw1fYCpk/0fwbPl8Gy3J668NX2AqZP9H8Gz5fBstyeuvDV9gKmT/R/Bs+XwbLcnrrw1fYCpk/0fwbPl8Gy3J668NX2AqZP9H8Gz5fBstyeuvDV9gKmT/R/Bs+XwbLcnrrw1fYCpk/0fwbPl8Gy3J668NX2AqZP9H8Gz5fBstyeuvDV9gKmT/R/Bs+XwbLcnrrw1fYCpk/0fwbPl8Gy3J668NX2AqZP9H8Gz5fBstyeuvDV9gKmT/R/Bs+XwbLcnrrw1fYCpk/0fwbPl8Gy3J668NX2AqZP9H8Gz5fA==";

	

	@GetMapping("/scan")
	public static Map<String, String> scan(){
		JSGFPLib sgfplib = new JSGFPLib();
		ScannerService.ScanResult result = ScannerService.init_scanner(sgfplib);
		byte[] template = result.templateBuffer;

		String encodedTemp = Base64.getEncoder().encodeToString(template);
		Map<String, String> response = new HashMap<>();
		response.put("template", encodedTemp);

		return response;
	}
	
	@GetMapping("/match")
	public static Map<String, Boolean> matchTemplate(@RequestParam(value = "template1", required = false) String template1, @RequestParam(value="template2", required = false) String template2) {
		JSGFPLib sgfplib = new JSGFPLib();
		sgfplib.OpenDevice(0);
		sgfplib.Init(SGFDxDeviceName.SG_DEV_AUTO);
		
		if(template1 == null || template2 == null || template1.isEmpty() || template2.isEmpty()){
			Map<String, Boolean> response = new HashMap<>();
			response.put("Matched", false);
			return response;
		}

		byte[] decodedTemp1 = Base64.getDecoder().decode(template1);
		byte[] decodedTemp2 = Base64.getDecoder().decode(template2);

		long sl = SGFDxSecurityLevel.SL_NORMAL;
		boolean[] matched = new boolean[1];

		sgfplib.MatchTemplate(decodedTemp1, decodedTemp2, sl, matched);

		sgfplib.Close();

		Map<String, Boolean> response = new HashMap<>();
		response.put("matched", true);
		return response;
	}

}

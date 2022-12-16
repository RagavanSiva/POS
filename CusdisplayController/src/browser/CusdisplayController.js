module.exports = (function () {
	let TAG = "CusdisplayController : ";
	let buffer = new Uint8Array(0);
	let encoder = new TextEncoder(); ;
	let comPort;
	let lightPrice = 0;
	let lightTotal = 0;
	let lightCollect = 0;
	let lightChange = 0;

	let ESC_Init = new Uint8Array([0x1b, 0x40]);
	let ESC_QA = new Uint8Array([0x1b, 0x51, 0x41]);
	let ESC_S = new Uint8Array([0x1b, 0x73, 0x30]);
	let STX_L = new Uint8Array([0x02, 0x4C, 0x30, 0x30, 0x30, 0x30]);
	let STX_B = new Uint8Array([0x02, 0x42, 0x32]);
	let CLR = new Uint8Array([0x0C]);
	let CAN = new Uint8Array([0x18]);
	let CR = new Uint8Array([0x0D]);

	function commit(portPath, success_cb, fail_cb) {
		//await sleep(50);
		plog('Connecting to serial port');

		if (comPort === undefined) {
			let serialport = nw.require('serialport');
			comPort = new serialport(portPath, {
					baudRate: 2400,
					autoOpen: true
				});
		}
		if (comPort.isOpen === false) {
			comPort.open(function (err) {
				if (err) {
					plog(err);
					plog('Port open error: ' + err.message);
					fail_cb('Port open error: ' + err.message);
					buffer = new Uint8Array(0);
					return;
				}
				plog('Port open success');

				plog(buffer);
				plog("Writing changes to display");

				comPort.write(buffer, function (err) {
					buffer = new Uint8Array(0);
					//comPort.close();
					if (err) {
						plog(err);
						plog('Write error: ' + err.message);
						fail_cb('Write error: ' + err.message);
						return;
					}
					plog('Write to port success');
					success_cb('success');
					return;
				});
			});
		} else {
			plog('Port already opened');

			plog(buffer);
			plog("Writing changes to display");

			comPort.write(buffer, function (err) {
				buffer = new Uint8Array(0);
				//comPort.close();
				if (err) {
					plog(err);
					plog('Write error: ' + err.message);
					fail_cb('Write error: ' + err.message);
					return;
				}
				plog('Write to port success');
				success_cb('success');
				return;
			});
		}

	}

	function init() {
		plog("Initializing display");
		encoder = new TextEncoder();
		buffer = new Uint8Array(0);
		lightPrice = 0;
		lightTotal = 0;
		lightCollect = 0;
		lightChange = 0;
		buffer = appendBuffer(buffer, ESC_Init);
	}

	function printTest() {
		buffer = appendBuffer(buffer, ESC_QA);
		let msg = "8.8.8.8.8.8.8.8";
		buffer = appendBuffer(buffer, encoder.encode(msg + "\r"));
	}

	function printTest2() {
		buffer = appendBuffer(buffer, ESC_QA);
		let msg = "123456789123456";
		buffer = appendBuffer(buffer, encoder.encode(msg + "\r"));
	}

	function print(msg) {
		plog("Printing data " + msg);
		buffer = appendBuffer(buffer, ESC_QA);
		buffer = appendBuffer(buffer, encoder.encode(msg + "\r"));
	}

	function enablePriceLight() {
		plog("Enable Price light");
		lightPrice = 1;
		printMode();
	}

	function disablePriceLight() {
		plog("Disable Price light");
		lightPrice = 0;
		printMode();
	}

	function enableTotalLight() {
		plog("Enable Total light");
		lightTotal = 1;
		printMode();
	}

	function disableTotalLight() {
		plog("Disable Total light");
		lightTotal = 0;
		printMode();
	}

	function enableCollectLight() {
		plog("Enable Collect light");
		lightCollect = 1;
		printMode();
	}

	function disableCollectLight() {
		plog("Disable Collect light");
		lightCollect = 0;
		printMode();
	}

	function enableChangeLight() {
		plog("Enable Change light");
		lightChange = 1;
		printMode();
	}

	function disableChangeLight() {
		plog("Disable Change light");
		lightChange = 0;
		printMode();
	}

	function printMode() {
		//plog("Setting print mode");
		let displayLightsStatus = STX_L;
		displayLightsStatus[2] = lightPrice ? 0x31 : 0x30;
		displayLightsStatus[3] = lightTotal ? 0x31 : 0x30;
		displayLightsStatus[4] = lightCollect ? 0x31 : 0x30;
		displayLightsStatus[5] = lightChange ? 0x31 : 0x30;
		buffer = appendBuffer(buffer, displayLightsStatus);
	}

	function clearDisplay() {
		plog("Clearing display");
		buffer = appendBuffer(buffer, CLR);
	}

	function clearCurrentLine() {
		plog("Clearing current line");
		buffer = appendBuffer(buffer, CAN);
	}

	function moveCursorLeft() {
		plog("Moving cursor to left-most position");
		buffer = appendBuffer(buffer, CR);
	}

	function positionCursor(cursorPosition) {
		plog("Enabling lights " + cursorPosition);
		let cursorPositionValue = ESC_S;
		cursorPositionValue[2] = encoder.encode(cursorPosition);
		buffer = appendBuffer(buffer, cursorPositionValue);
	}

	function setBaudrate(baudRate) {
		plog("Setting baudrate");
		let baudRateValue = STX_B;
		baudRateValue[2] = encoder.encode(baudRate);
		buffer = appendBuffer(buffer, baudRateValue);
	}

	function portReset() {
		plog("Resetting port");
		if (comPort !== undefined) {
			comPort.close();
			comPort = undefined;
		}
	}

	// sleep time expects milliseconds
	function sleep(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	// concat array buffers
	function appendBuffer(buffer1, buffer2) {
		var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
		tmp.set(new Uint8Array(buffer1), 0);
		tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
		return tmp;
	}

	// logging
	function plog(msg) {
		if (typeof msg == "object")
			console.log(msg);
		else
			console.log(TAG.concat(msg));
	}

	return {
		commit: function (portPath, success_cb, fail_cb) {
			commit(portPath, success_cb, fail_cb);
		},
		init: function (success_cb, fail_cb) {
			init();
		},
		printTest: function (success_cb, fail_cb) {
			printTest();
		},
		printTest2: function (success_cb, fail_cb) {
			printTest2();
		},
		setBaudrate: function (baudRate, success_cb, fail_cb) {
			setBaudrate(baudRate);
		},
		print: function (msg, success_cb, fail_cb) {
			print(msg);
		},
		enablePriceLight: function (success_cb, fail_cb) {
			enablePriceLight();
		},
		disablePriceLight: function (success_cb, fail_cb) {
			disablePriceLight();
		},
		enableTotalLight: function (success_cb, fail_cb) {
			enableTotalLight();
		},
		disableTotalLight: function (success_cb, fail_cb) {
			disableTotalLight();
		},
		enableCollectLight: function (success_cb, fail_cb) {
			enableCollectLight();
		},
		disableCollectLight: function (success_cb, fail_cb) {
			disableCollectLight();
		},
		enableChangeLight: function (success_cb, fail_cb) {
			enableChangeLight();
		},
		disableChangeLight: function (success_cb, fail_cb) {
			disableChangeLight();
		},
		clearDisplay: function (success_cb, fail_cb) {
			clearDisplay();
		},
		clearCurrentLine: function (success_cb, fail_cb) {
			clearCurrentLine();
		},
		disableAll: function (success_cb, fail_cb) {
			positionCursor(0);
		},
		enablePrice: function (success_cb, fail_cb) {
			positionCursor(1);
		},
		enableTotal: function (success_cb, fail_cb) {
			positionCursor(2);
		},
		enableCollect: function (success_cb, fail_cb) {
			positionCursor(3);
		},
		portReset: function (success_cb, fail_cb) {
			portReset();
		}
	}
})();

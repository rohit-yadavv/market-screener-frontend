export const macdCrossSignalLinePineScript = `


//@version=5
indicator("MACD Webhook (Multi-Stock)", overlay=false)

// MACD Calculation
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)

// Detect crossover
isUp = ta.crossover(macdLine, signalLine)
isDown = ta.crossunder(macdLine, signalLine)
crossed = isUp or isDown

// Determine direction and zero-line zone
direction = isUp ? "up" : "down"
zone = (macdLine > 0 and signalLine > 0) ? "above" :
       (macdLine < 0 and signalLine < 0) ? "below" : "mixed"

shouldTrigger = crossed and (zone == "above" or zone == "below")

// Format timestamp
timeStr = str.tostring(year) + "-" + str.tostring(month) + "-" + str.tostring(dayofmonth) + " " +
          str.tostring(hour) + ":" + str.tostring(minute, "#00")

// Static userId or inject dynamically if automating
userId = "user123"

// Construct JSON
msg = '{"userId":"' + userId + '","symbol":"' + syminfo.ticker + '","macd":' +
      str.tostring(macdLine) + ',"signal":' + str.tostring(signalLine) + ',"direction":"' +
      direction + '","zone":"' + zone + '","time":"' + timeStr + '"}'

// Fire alert
if shouldTrigger
    alert(msg, alert.freq_once_per_bar)


    
`;

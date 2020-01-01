let total = 0
$(document).ready(function () {
    $("#btn-deposit").click(function () {
        let count2000 = parseInt($("#curr2000").val())
        let count500 = parseInt($("#curr500").val())
        let count200 = parseInt($("#curr200").val())
        let count100 = parseInt($("#curr100").val())
        let curr2000 = 2000 * count2000
        let curr500 = 500 * count500
        let curr200 = 200 * count200
        let curr100 = 100 * count100
        let totalDepositAmt = parseInt(curr2000) + parseInt(curr500) + parseInt(curr200) + parseInt(curr100)
        total = parseInt(total) + parseInt(totalDepositAmt)
        document.getElementById('td-total').innerText = total
        document.getElementById('old-curr2000').innerText = parseInt($("#curr2000").val()) + parseInt(document.getElementById('old-curr2000').innerText)
        document.getElementById('old-curr500').innerText = parseInt($("#curr500").val()) + parseInt(document.getElementById('old-curr500').innerText)
        document.getElementById('old-curr200').innerText = parseInt($("#curr200").val()) + parseInt(document.getElementById('old-curr200').innerText)
        document.getElementById('old-curr100').innerText = parseInt($("#curr100").val()) + parseInt(document.getElementById('old-curr100').innerText)
        $("#curr2000").val("0")
        $("#curr500").val("0")
        $("#curr200").val("0")
        $("#curr100").val("0")
        let date = new Date();
        $('#log-holder').prepend($('<div class="alert alert-info">Deposit [' + totalDepositAmt + '] 2000:' + count2000 + ' 500:' + count500 + ' 200:' + count200 + ' 100:' + count100 + '<br><small>' + date + '</small></div>'));
    });

    $("#btn-withdraw").click(function () {
        if (parseInt($("#inp-withdraw").val()) > total) {
            alert("Insufficient Balance")
        } else if (parseInt($("#inp-withdraw").val()) % 100 != 0) {
            alert("Incorrect Amount entered")
        } else {
            let availableCurrency = {
                2000: parseInt(document.getElementById('old-curr2000').innerText),
                500: parseInt(document.getElementById('old-curr500').innerText),
                200: parseInt(document.getElementById('old-curr200').innerText),
                100: parseInt(document.getElementById('old-curr100').innerText)
            }
            let getMoney = (amount, availableCurrency) => {
                let recur = (amount, nominals) => {
                    if (amount == 0) { return {} }; // success
                    if (!nominals.length) { alert("Unable to dispence the specified amount!"); return }; // failure
                    let nominal = nominals[0];
                    let count = Math.min(availableCurrency[nominal], Math.floor(amount / nominal));
                    for (let i = count; i >= 0; i--) {
                        let result = recur(amount - i * nominal, nominals.slice(1));
                        if (result) return i ? { [nominal]: i, ...result } : result;
                    }
                }
                return recur(amount, Object.keys(availableCurrency).map(Number).sort((a, b) => b - a));
            };
            let moneyDespenced = getMoney(parseInt($("#inp-withdraw").val()), availableCurrency)
            let curr2000 = moneyDespenced[2000] || 0;
            let curr500 = moneyDespenced[500] || 0
            let curr200 = moneyDespenced[200] || 0
            let curr100 = moneyDespenced[100] || 0
            let date = new Date();
            $('#log-holder').prepend($('<div class="alert alert-success">Withdraw [' + parseInt($("#inp-withdraw").val()) + '] 2000:' + curr2000 + ' 500:' + curr500 + ' 200:' + curr200 + ' 100:' + curr100 + '<br><small>' + date + '</small></div>'));
            total = parseInt(total) - parseInt($("#inp-withdraw").val())
            document.getElementById('td-total').innerText = total
            $("#inp-withdraw").val("")
            for (let key in moneyDespenced) {
                document.getElementById('old-curr' + key).innerText = parseInt(document.getElementById('old-curr' + key).innerText) - moneyDespenced[key]
            }
        }
    })
});
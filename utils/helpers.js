module.exports = {
    format_date: (date) => {
        var year = date.getFullYear();
        var month = 1 + date.getMonth();
        var day = date.getDate();
        return month + '/' + day + '/' + year;
      }
}
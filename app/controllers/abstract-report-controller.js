import Ember from "ember";
import DateFormat from 'hospitalrun/mixins/date-format';
import NumberFormat from 'hospitalrun/mixins/number-format';
import ProgressDialog from "hospitalrun/mixins/progress-dialog";
export default Ember.ArrayController.extend(DateFormat, NumberFormat, ProgressDialog, {
    progressMessage: 'Please wait while your report is generated.',
    progressTitle: 'Generating Report',
    reportColumns: null,
    reportRows: [],
    reportTitle: null,
    reportType: null,
    reportTypes: null,    
    showReportResults: false,
    
    /**
     * Add a row to the report using the selected columns to add the row.
     * @param {Array} row the row to add
     * @param {boolean} skipNumberFormatting true if number columns should not be formatted.
     */
    _addReportRow: function(row, skipNumberFormatting) {
        var columnValue,
            reportColumns = this.get('reportColumns'),
            reportRows = this.get('reportRows'),
            reportRow = [];
        for (var column in reportColumns) {
            if (reportColumns[column].include) {
                columnValue = Ember.get(row,reportColumns[column].property);
                if (Ember.isEmpty(columnValue)) {
                     reportRow.push('');
                } else if (reportColumns[column].format === '_numberFormat') {
                    if (skipNumberFormatting) {
                        reportRow.push(columnValue);
                    } else {
                        reportRow.push(this._numberFormat(columnValue));
                    }
                } else if (reportColumns[column].format) {
                    reportRow.push(this[reportColumns[column].format](columnValue));
                } else {
                    reportRow.push(columnValue);
                }
            }
        }
        reportRows.addObject(reportRow);
    },

    _generateExport: function() {
        var csvRows = [],
            reportHeaders = this.get('reportHeaders'),
            dataArray = [reportHeaders];
        dataArray.addObjects(this.get('reportRows'));
        dataArray.forEach(function(row) { 
            csvRows.push('"'+row.join('","')+'"');
        });
        var csvString = csvRows.join('\r\n');
        var uriContent = "data:application/csv;charset=utf-8," + encodeURIComponent(csvString);
        this.set('csvExport', uriContent);
    },
    
    _setReportHeaders: function() {
        var reportColumns = this.get('reportColumns'),
            reportHeaders = [];
        for (var column in reportColumns) {
            if (reportColumns[column].include) {
                reportHeaders.push(reportColumns[column].label);
            }
        }
        this.set('reportHeaders', reportHeaders);
    },

    
});
package controllers;

import io.ebean.ExpressionList;
import models.Tenants;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCreationHelper;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import play.data.DynamicForm;
import play.data.FormFactory;
import play.libs.Json;
import play.mvc.Result;
import utils.Util;

import javax.inject.Inject;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class SearchController extends AppController {
    // variable definitions
    FormFactory formFactory;

    // We inject a FormFactory, which is a helper class to create forms.
    @Inject
    public SearchController(FormFactory formFactory) {
        this.formFactory = formFactory;
    }

    public Result landing() {
        return ok(views.html.search.render(isLoggedIn(), getUserJson()));
    }
    public Result search(){
        System.out.println("## INSIDE SEARCH");
        DynamicForm boundForm = formFactory.form().bindFromRequest();
        String searchType = boundForm.get("searchType");
        String departmentCode = boundForm.get("department.value");
        String networkId = boundForm.get("network.value");
        System.out.println("The search type is: " + searchType);
        if ("Vba".equals(searchType)) {
            System.out.println("## Tenants SEARCH IN PROGRESS ##");
            //Do a Tenants search
            List<Tenants> results = getTenants(departmentCode, networkId);
            System.out.println("##### THERE ARE " + results.size() + " ITEMS IN THE Tenants SEARCH COLLECTION");
            return ok(Json.toJson(results));
        } else if ("Farmers".equals(searchType)) {
            System.out.println("## FARMERS SEARCH IN PROGRESS ##");
            Tenants results = new Tenants();
            return ok(Json.toJson(results));
        } else if("Trainings".equals(searchType)){
            System.out.println("## TRAININGS SEARCH IN PROGRESS ##");
            Tenants results = new Tenants();
            return ok(Json.toJson(results));
        }else if("Interventions".equals(searchType)){
            System.out.println("## INTERVENTIONS SEARCH IN PROGRESS ##");
            Tenants results = new Tenants();
            return ok(Json.toJson(results));
        }
        return badRequest(infoMessage("Search failed"));
    }

    /* this method is for exporting search results as Excel format*/
    public Result exportResults() {
        DynamicForm boundForm = formFactory.form().bindFromRequest();
        String resultType = boundForm.get("searchType");
        String departmentCode = boundForm.get("department.value");
        String networkId = boundForm.get("network.value");

        try {
            File tempFIle = File.createTempFile("search_results", ".xlsx");
            FileOutputStream fileOut = new FileOutputStream(tempFIle);
            // create a new workbook
            XSSFWorkbook workbook = new XSSFWorkbook();
            // create a new worksheet
            XSSFSheet worksheet = workbook.createSheet("Search Results Worksheet");
            // declare a row object reference
            Row row1 = worksheet.createRow(0);
            // create cell styles
            CellStyle cellStyle = workbook.createCellStyle();
            CellStyle dateStyle = workbook.createCellStyle();
            // create a font style
            XSSFFont headings = workbook.createFont();

            // Return visit results here
            if ("Vba".equals(resultType)) {
                writeHeader(0, "Houshold Code", row1, cellStyle, headings);
                writeHeader(1, "VBA Name", row1, cellStyle, headings);
                writeHeader(2, "Phone Number", row1, cellStyle, headings);
                writeHeader(3, "Gender", row1, cellStyle, headings);
                writeHeader(4, "Age", row1, cellStyle, headings);
                writeHeader(5, "Latitude", row1, cellStyle, headings);
                writeHeader(6, "Longitude", row1, cellStyle, headings);

                /**
                 * writing Tenants data to the sheet
                 *
                 * @return
                 */
                List<Tenants> TenantsResultSet = getTenants(departmentCode, networkId);

                if (!TenantsResultSet.isEmpty()) {
                    int i = 1;
                    i = writeTenantsResults(workbook, worksheet, dateStyle, TenantsResultSet, i);
                }

            }
            // Return drive ins results here
            else if ("Farmers".equals(resultType)) {
                System.out.println("Exporting Farmers Workbook");
            }
            workbook.write(fileOut);
            workbook.close();
            response().setHeader("Content-Disposition", "inline; filename=search_results");
            return ok(tempFIle.getAbsoluteFile());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return badRequest(errorMessage("Export Failed"));
    }
    //Refactored method to get Tenants based on the Network or Department they come from
    //if the Network field has been filled, it will return Tenants from the chosen network.
    //if the network field is empty, it will return Tenants from the Department the user has specified
    private List<Tenants> getTenants(String departmentCode, String networkId) {
        // Tenants results collection
        ExpressionList<Tenants> TenantsCriteria = Tenants.find.query().where();
        //if the networks option was selected, return only results for the selected network
        if (Util.isNotEmpty(networkId)) {
            TenantsCriteria.eq("vba_network_id", networkId).setFirstRow(1).setMaxRows(100).findPagedList().getList();
            System.out.println("Returned " + TenantsCriteria.findList().size() + " results" + " from network " + networkId);
        }
        //if the networks option was empty, return a list of all Tenants in that department
        else {
            TenantsCriteria.query().where().in("network_id.network_department", departmentCode);
            System.out.println("Returned " + TenantsCriteria.findList().size() + " results" + " from " + departmentCode + " program");
        }
        return TenantsCriteria.setFirstRow(1).setMaxRows(1000).findList();
    }

    // method writes to the Tenants results worksheet
    private int writeTenantsResults(XSSFWorkbook workbook, XSSFSheet worksheet, CellStyle dateStyle, List<Tenants> TenantsResultSet, int i) {
        for (Tenants item : TenantsResultSet) {
            Row row = worksheet.createRow(i);
            int colnum = 1;
            Cell cell = row.createCell(colnum++);
            row = worksheet.createRow(i);
            //get Vba code
            cell = writeResultsRow(0, row);
            cell.setCellValue(item.getPhone_no());
            //get Vba name
            cell = writeResultsRow(1, row);
            cell.setCellValue(item.getPhone_no());
            //get phone number
            cell = writeResultsRow(2, row);
            cell.setCellValue(item.getPhone_no());
            //get gender
            cell = writeResultsRow(3, row);
            cell.setCellValue(item.getPhone_no());
            //get age
            cell = writeResultsRow(4, row);
            cell.setCellValue(item.getPhone_no());
            //get Latitude
            cell = writeResultsRow(5, row);
            cell.setCellValue(item.getPhone_no());
            //get Longitude
            cell = writeResultsRow(6, row);
            cell.setCellValue(item.getPhone_no());
            i++;
        }
        return i;
    }

    //method for date style in the worksheet
    private void writeDateStyle(XSSFWorkbook workbook, CellStyle dateStyle, Cell cell, Row row) {

        XSSFCreationHelper createHelper = workbook.getCreationHelper();
        dateStyle.setDataFormat(createHelper.createDataFormat().getFormat("m/d/yy HH:mm:ss"));
        cell.setCellStyle(dateStyle);
    }

    private Cell writeResultsRow(int columnInt, Row row) {
        Cell cell;
        cell = row.createCell(columnInt);
        return cell;
    }

    //method writes to the Farmers results worksheet
//    private int writedResults(XSSFWorkbook workbook, XSSFSheet worksheet, CellStyle dateStyle, List<S> dresultSet,
//                              int i) {
//        for (Scan ditem : dresultSet) {
//            Row row = worksheet.createRow(i);
//            int colnum = 1;
//            Cell cell = row.createCell(colnum++);
//            row = worksheet.createRow(i);
//            cell = writeResultsRow(0, row);
//            cell.setCellValue(ditem.getVehicle().getPlateNumber());
//            // get entry driver
//            cell = writeResultsRow(1, row);
//            cell.setCellValue(
//                    ditem.getEntryDriver().getFirstName() + " " + ditem.getEntryDriver().getLastName());
//            // get entry time
//            cell = writeResultsRow(2, row);
//            XSSFCreation
// Helper createHelper = workbook.getCreationHelper();
//            dateStyle.setDataFormat(createHelper.createDataFormat().getFormat("m/d/yy HH:mm:ss"));
//            cell.setCellValue(ditem.getEntryTime());
//            cell.setCellStyle(dateStyle);
//            // get entry occupants
//            cell = writeResultsRow(3, row);
//            cell.setCellValue(ditem.getEntryOccupants());
//            // get checked in by
//            cell = writeResultsRow(4, row);
//            cell.setCellValue(
//                    ditem.getCheckInBy().getFirstName() + " " + ditem.getCheckOutBy().getLastName());
//            // get exit time
//            cell = writeResultsRow(5, row);
//            cell.setCellValue(ditem.getExitTime());
//            cell.setCellStyle(dateStyle);
//            // get exit driver
//            cell = writeResultsRow(6, row);
//            cell.setCellValue(
//                    ditem.getExitDriver().getFirstName() + " " + ditem.getExitDriver().getLastName());
//            // get exit occupants
//            cell = writeResultsRow(7, row);
//            cell.setCellValue(ditem.getExitOccupants());
//            // get Checked Out by
//            cell = writeResultsRow(8, row);
//            cell.setCellValue(
//                    ditem.getCheckOutBy().getFirstName() + " " + ditem.getCheckOutBy().getLastName());
//            i++;
//        }
//        return i;
//    }
    //method for formatting headers on the worksheet
    private void writeHeader(int columnInt, String text, Row row1, CellStyle cellStyle, XSSFFont headings) {
        Cell cellA1 = row1.createCell(columnInt);
        // set the cell value
        cellA1.setCellValue(text);
        // make the font bold
        headings.setBold(true);
        cellStyle.setFont(headings);
        //set the cell style
        cellA1.setCellStyle(cellStyle);
        return;
    }
}

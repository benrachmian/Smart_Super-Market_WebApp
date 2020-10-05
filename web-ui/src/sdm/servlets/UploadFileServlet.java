package sdm.servlets;

import SDMSystem.system.SDMSystem;
import sdm.constants.Constants;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.SequenceInputStream;
import java.util.*;

//@WebServlet("/uploadFiles")
@MultipartConfig(fileSizeThreshold = 1024 * 1024, maxFileSize = 1024 * 1024 * 5, maxRequestSize = 1024 * 1024 * 5 * 5)
public class UploadFileServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("/pages/zones-and-info/zones_and_info.html");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        SDMSystem sdmSystem = ServletUtils.getSDMSystem(getServletContext());
        String usernameFromSession = SessionUtils.getUsername(request);

        Collection<Part> parts = request.getParts();

//        out.println("Total parts : " + parts.size() + "\n");

//        StringBuilder fileContent = new StringBuilder();

        Collection<InputStream> fileInputStreamList = new LinkedList<>();

        for (Part part : parts) {
            //to write the content of the file to a string
//            fileContent.append("New Part content:").append("\n");
//            fileContent.append(readFromInputStream(part.getInputStream())).append("\n");
            fileInputStreamList.add(part.getInputStream());
        }

        SequenceInputStream fileInputStream =  new SequenceInputStream(Collections.enumeration(fileInputStreamList));

        try {
            sdmSystem.loadSystemWithInputStream(fileInputStream,usernameFromSession);
        } catch (Exception e) {
            request.setAttribute(Constants.ERROR, e.getMessage());
            out.println();
        }
    }



    private String readFromInputStream(InputStream inputStream) {
        return new Scanner(inputStream).useDelimiter("\\Z").next();
    }

}

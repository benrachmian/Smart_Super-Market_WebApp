package sdm.servlets;

import SDMSystem.system.SDMSystem;
import com.google.gson.Gson;
import javafx.application.Application;
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

@WebServlet(name = "UploadFileServlet", urlPatterns = {"/uploadfile"})
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


        Collection<InputStream> fileInputStreamList = new LinkedList<>();

        for (Part part : parts) {
            if(part.getContentType() == null){
                throw new RuntimeException("You must choose an xml file!");
            }
            fileInputStreamList.add(part.getInputStream());
        }


        SequenceInputStream fileInputStream =  new SequenceInputStream(Collections.enumeration(fileInputStreamList));

        try {
            sdmSystem.loadSystemWithInputStream(fileInputStream,usernameFromSession);
//            ErrorMsg cav = new ErrorMsg("BENNNN");
//            Gson gson = new Gson();
//            String jsonResponse = gson.toJson(cav);
//            out.println();
//            out.flush();
        } catch (Exception e) {
//            request.setAttribute(Constants.ERROR, e.getMessage());
            ErrorMsg cav = new ErrorMsg(e.getMessage());
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(cav);
//            out.println();
//            out.flush();
//            response.sendError(404,e.getMessage());
            response.setStatus(400);
            out.print(e.getMessage());
            out.flush();
        }
    }



    private String readFromInputStream(InputStream inputStream) {
        return new Scanner(inputStream).useDelimiter("\\Z").next();
    }

    private static class ErrorMsg {

        final private String errorMsg;

        public ErrorMsg(String errorMsg) {
            this.errorMsg = errorMsg;
        }
    }

}

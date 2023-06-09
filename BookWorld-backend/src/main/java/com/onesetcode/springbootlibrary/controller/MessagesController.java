package com.onesetcode.springbootlibrary.controller;

import com.onesetcode.springbootlibrary.entity.Message;
import com.onesetcode.springbootlibrary.requestmodels.AdminQuestionRequest;
import com.onesetcode.springbootlibrary.service.MessagesService;
import com.onesetcode.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://mybookworld.azurewebsites.net")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {

    public MessagesService messageService;

    @Autowired
    public MessagesController(MessagesService messagesService) {
        this.messageService = messagesService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value="Authorization") String token,
                            @RequestBody Message messageRequest) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value="Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        messageService.putMessage(adminQuestionRequest, userEmail);
    }
}

package com.tw.wh.devops.security;

import org.opensaml.saml2.core.Attribute;
import org.opensaml.xml.XMLObject;
import org.opensaml.xml.schema.XSString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.providers.ExpiringUsernameAuthenticationToken;
import org.springframework.security.saml.SAMLCredential;
import org.springframework.security.saml.metadata.MetadataManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

/**
 * Created by hwwei on 2017/3/6.
 */
@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    MetadataManager mm;

    @RequestMapping
    public Account current(HttpServletRequest request) {
        Principal userPrincipal = request.getUserPrincipal();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name =  userPrincipal.getName();
        SAMLCredential credentials = (SAMLCredential) ((ExpiringUsernameAuthenticationToken) authentication).getCredentials();
        Attribute admin = credentials.getAttribute("admin");
        List<XMLObject> attributeValues = admin.getAttributeValues();
        String isAdmin = "false";
        if (attributeValues.size() > 0) {
            XSString xmlObject = (XSString) attributeValues.get(0);
            isAdmin = xmlObject.getValue();
        }
        Account account = new Account(name, Boolean.valueOf(isAdmin));
        return account;
    }
}

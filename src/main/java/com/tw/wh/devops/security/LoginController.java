package com.tw.wh.devops.security;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.security.saml.metadata.MetadataManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * Created by hwwei on 2017/3/6.
 */
@Controller
@RequestMapping("/login")
public class LoginController implements ApplicationContextAware {

    @Autowired
    MetadataManager mm;
    private ApplicationContext context;


    @RequestMapping
    public String login(HttpServletRequest request, Map<String, Object> model) {
        Set<String> idps = mm.getIDPEntityNames();
        Iterator<String> iterator = idps.iterator();
        boolean b = iterator.hasNext();
        if (!b) {
            return "redirect:/err";
        }
        String next = iterator.next();
        String idpDiscoReturnURL = (String) request.getAttribute("idpDiscoReturnURL");
        Object idpDiscoReturnParam = request.getAttribute("idpDiscoReturnParam");
        return "forward:" + idpDiscoReturnURL + "&" + idpDiscoReturnParam + "=" + next;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = applicationContext;
    }
}

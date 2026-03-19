package com.example.underwritermatcher.dto;

public class MatchResultDto {

    private Long underwriterId;
    private String underwriterName;
    private String contactPerson;
    private String email;
    private String phone;
    private String web;
    private String address;

    public MatchResultDto(Long underwriterId, String underwriterName, String contactPerson,
                          String email, String phone, String web, String address) {
        this.underwriterId = underwriterId;
        this.underwriterName = underwriterName;
        this.contactPerson = contactPerson;
        this.email = email;
        this.phone = phone;
        this.web = web;
        this.address = address;
    }

    public Long getUnderwriterId() {
        return underwriterId;
    }

    public String getUnderwriterName() {
        return underwriterName;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getWeb() {
        return web;
    }

    public String getAddress() {
        return address;
    }
}
package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

//@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CV {

    @Id
    private Long id;

    private String name;

    private CVStatus status;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] data;

    public enum CVStatus {
        APPROVED, DENIED, UNREVIEWED
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CVStatus getStatus() {
        return status;
    }

    public void setStatus(CVStatus status) {
        this.status = status;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
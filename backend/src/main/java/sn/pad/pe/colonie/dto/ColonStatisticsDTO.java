package sn.pad.pe.colonie.dto;

public class ColonStatisticsDTO {
    private Long totalColons;
    private Long age7to10;
    private Long age10to15;
    private Long age15to18;
    private Long femaleCount;
    private Long maleCount;
    public Long getTotalColons() {
        return totalColons;
    }
    public void setTotalColons(Long totalColons) {
        this.totalColons = totalColons;
    }
    public Long getAge7to10() {
        return age7to10;
    }
    public void setAge7to10(Long age7to10) {
        this.age7to10 = age7to10;
    }
    public Long getAge10to15() {
        return age10to15;
    }
    public void setAge10to15(Long age10to15) {
        this.age10to15 = age10to15;
    }
    public Long getAge15to18() {
        return age15to18;
    }
    public void setAge15to18(Long age15to18) {
        this.age15to18 = age15to18;
    }

    // Getters and setters

    public Long getFemaleCount() {
        return femaleCount;
    }

    public void setFemaleCount(Long femaleCount) {
        this.femaleCount = femaleCount;
    }

    public Long getMaleCount() {
        return maleCount;
    }

    public void setMaleCount(Long maleCount) {
        this.maleCount = maleCount;
    }
}

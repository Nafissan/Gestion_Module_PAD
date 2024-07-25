package sn.pad.pe.pelerinage.dto;

public class PelerinStatsDTO {
    private Long totalPelerins;
    private Long age40to50;
    private Long age50to60;
    private Long age60to70;
    private Long femaleCount;
    private Long maleCount;
    public Long getTotalPelerins() {
        return totalPelerins;
    }
    public void setTotalPelerins(Long totalPelerins) {
        this.totalPelerins = totalPelerins;
    }
    public Long getAge40to50() {
        return age40to50;
    }
    public void setAge40to50(Long age40to50) {
        this.age40to50 = age40to50;
    }
    public Long getAge50to60() {
        return age50to60;
    }
    public void setAge50to60(Long age50to60) {
        this.age50to60 = age50to60;
    }
    public Long getAge60to70() {
        return age60to70;
    }
    public void setAge60to70(Long age60to70) {
        this.age60to70 = age60to70;
    }
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

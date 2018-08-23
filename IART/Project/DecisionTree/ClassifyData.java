public class ClassifyData {
    private double ip_sd;
    private double ip_ek;
    private double ip_mean;
    private double ip_s;
    private double dm_mean;
    private double dm_sd;
    private double dm_ek;
    private double dm_s;

    ClassifyData(double ip_mean, double ip_sd, double ip_ek, double ip_s, double dm_mean, double dm_sd, double dm_ek, double dm_s) {
        this.ip_sd = ip_sd;
        this.ip_ek = ip_ek;
        this.ip_mean = ip_mean;
        this.ip_s = ip_s;
        this.dm_mean = dm_mean;
        this.dm_sd = dm_sd;
        this.dm_ek = dm_ek;
        this.dm_s = dm_s;
    }

    double[] getValues() {
        return new double[] {ip_mean, ip_sd, ip_ek, ip_s, dm_mean, dm_sd, dm_ek, dm_s};
    }
}

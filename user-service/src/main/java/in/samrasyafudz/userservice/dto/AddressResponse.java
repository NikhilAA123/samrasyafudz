package in.samrasyafudz.userservice.dto;

public class AddressResponse {

    private final Long id;
    private final String label;
    private final String addressLine1;
    private final String addressLine2;
    private final String area;
    private final String city;
    private final String state;
    private final String pincode;
    private final Double latitude;
    private final Double longitude;
    private final Boolean isDefault;

    public AddressResponse(Long id, String label, String addressLine1, String addressLine2,
                           String area, String city, String state, String pincode,
                           Double latitude, Double longitude, Boolean isDefault) {
        this.id = id;
        this.label = label;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.area = area;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isDefault = isDefault;
    }

    public Long getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public String getArea() {
        return area;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getPincode() {
        return pincode;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Boolean getIsDefault() {
        return isDefault;
    }
}
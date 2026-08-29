package in.samrasyafudz.userservice.service;

import in.samrasyafudz.userservice.dto.AddressRequest;
import in.samrasyafudz.userservice.dto.AddressResponse;
import in.samrasyafudz.userservice.entity.Address;
import in.samrasyafudz.userservice.entity.User;
import in.samrasyafudz.userservice.exception.AddressNotFoundException;
import in.samrasyafudz.userservice.repository.AddressRepository;
import in.samrasyafudz.userservice.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<AddressResponse> listForUser(Long userId) {
        return addressRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public AddressResponse create(Long userId, AddressRequest request) {
        User user = userRepository.getReferenceById(userId);

        if (Boolean.TRUE.equals(request.getIsDefault())) {
            clearExistingDefault(userId);
        }

        Address address = new Address();
        address.setUser(user);
        applyRequest(address, request);

        return toResponse(addressRepository.save(address));
    }

    @Transactional
    public AddressResponse update(Long userId, Long addressId, AddressRequest request) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(AddressNotFoundException::new);

        if (Boolean.TRUE.equals(request.getIsDefault()) && !Boolean.TRUE.equals(address.getIsDefault())) {
            clearExistingDefault(userId);
        }

        applyRequest(address, request);
        return toResponse(addressRepository.save(address));
    }

    @Transactional
    public void delete(Long userId, Long addressId) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(AddressNotFoundException::new);
        addressRepository.delete(address);
    }

    @Transactional(readOnly = true)
    public AddressResponse getOne(Long userId, Long addressId) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(AddressNotFoundException::new);
        return toResponse(address);
    }

    private void clearExistingDefault(Long userId) {
        List<Address> existing = addressRepository.findByUserId(userId);
        for (Address a : existing) {
            if (Boolean.TRUE.equals(a.getIsDefault())) {
                a.setIsDefault(false);
                addressRepository.save(a);
            }
        }
    }

    private void applyRequest(Address address, AddressRequest request) {
        address.setLabel(request.getLabel());
        address.setAddressLine1(request.getAddressLine1());
        address.setAddressLine2(request.getAddressLine2());
        address.setArea(request.getArea());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setLatitude(request.getLatitude());
        address.setLongitude(request.getLongitude());
        address.setGooglePlaceId(request.getGooglePlaceId());
        if (request.getIsDefault() != null) {
            address.setIsDefault(request.getIsDefault());
        }
    }

    private AddressResponse toResponse(Address a) {
        return new AddressResponse(
                a.getId(), a.getLabel(), a.getAddressLine1(), a.getAddressLine2(),
                a.getArea(), a.getCity(), a.getState(), a.getPincode(),
                a.getLatitude(), a.getLongitude(), a.getIsDefault()
        );
    }
}
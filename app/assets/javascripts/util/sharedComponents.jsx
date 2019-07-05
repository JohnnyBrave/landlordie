/**
 * This file shall contain the shared componenets that are used in different places within the
 * secured application
 *
 * Date Formating functions
 */
//date formatter helper
var allAvailableOptions = {
    year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};

var monthYearOptions = {
    year: "numeric",
    month: "short"
};
var listIdTypeURL = "/sentinel/list/idType";
var personOrgSearchURL = "/kodi/search/personOrgSearch";
var countryURL = "/sentinel/list/country";
var userRolesURL = "/sentinel/list/roles";
var organizationMemberURL = "/sentinel/list/userOrganization";
var idTypeURL = "/sentinel/list/idType";
var facilityURL = "/sentinel/list/facilities";

//
function formatDate(dateValue, options = monthYearOptions) {
    return new Date(dateValue).toLocaleTimeString("en-KE", options)
}

//default param is all options
function formatDateMonthDay(dateValue, options = allAvailableOptions) {
    return new Date(dateValue).toLocaleTimeString("en-KE", options)
}

window.PersonForm = React.createClass({

    propTypes: {
        //All these are required to for the use of this component
        person: React.PropTypes.object.isRequired,
        textChanged: React.PropTypes.func.isRequired,
        organizationChanged: React.PropTypes.func.isRequired,
        savePerson: React.PropTypes.func.isRequired,
        cancelPerson: React.PropTypes.func.isRequired,
        idTypeChanged: React.PropTypes.func.isRequired,
        fullForm: React.PropTypes.bool.isRequired,
        task: React.PropTypes.string.isRequired,
        facilityChanged: React.PropTypes.func,
        roleChanged: React.PropTypes.func
    },

    savePerson: function () {
        this.props.savePerson();
    },

    cancelPerson: function () {
        this.props.cancelPerson();
    },

    idTypeChanged: function (passedValue) {
        this.props.idTypeChanged(passedValue);
    },

    organizationChanged: function (passedValue) {
        this.props.organizationChanged(passedValue);
    },

    roleChanged: function (passedValue) {
        this.props.roleChanged(passedValue);
    },


    textChanged: function (event) {
        this.props.textChanged(event);
    },

    render: function () {
        return (
            <div className="ui form">
                <div className="ui segments">
                    <h4 className="ui top attached header">{this.props.task} User</h4>
                    <div className="ui attached segment">
                        <div className="field">
                            <div className="two fields">
                                <div className="field">
                                    <label>First Name <span>*</span></label>
                                    <Input type="text"
                                           name={'firstName'}
                                           htmlFor={'firstName'}
                                           isrequired={true}
                                           onChange={this.textChanged}
                                           messageRequired={'First Name is required'}
                                           value={this.props.person && this.props.person.firstName}/>
                                </div>
                                <div className="field">
                                    <label>Last Name <span>*</span></label>
                                    <Input type="text"
                                           name={'lastName'}
                                           htmlFor={'lastName'}
                                           isrequired={true}
                                           onChange={this.textChanged}
                                           messageRequired={'Last Name is required'}
                                           value={this.props.person && this.props.person.lastName}/>
                                </div>
                            </div>
                            <div className="two fields">
                                <div className="field">
                                    <label>Mobile Phone <span>*</span></label>
                                    <Input type="text"
                                           name={'mobilePhone'}
                                           htmlFor={'mobilePhone'}
                                           isrequired={true}
                                           onChange={this.textChanged}
                                           messageRequired={'Mobile Phone is required'}
                                           value={this.props.person && this.props.person.mobilePhone}/>
                                </div>
                                <div className="field">
                                    <label>Office Phone</label>
                                    <Input type="text"
                                           name={'officePhone'}
                                           htmlFor={'officePhone'}
                                           isrequired={false}
                                           onChange={this.textChanged}
                                           value={this.props.person && this.props.person.officePhone}/>
                                </div>
                            </div>

                            <div className="two fields">
                                <div className="field">
                                    <label>ID Type <span>*</span></label>
                                    <SingleSelect
                                        name="idType.code"
                                        required={true}
                                        placeholder="Select ID Type"
                                        selectedValue={this.props.person && this.props.person.idType
                                        && this.props.person.idType.code}
                                        _valueChanged={this.idTypeChanged}
                                        selectUrl={idTypeURL}/>
                                </div>
                                <div className="field">
                                    <label>ID Number <span>*</span></label>
                                    <Input type="text"
                                           name={'idNumber'}
                                           htmlFor={'idNumber'}
                                           isrequired={true}
                                           messageRequired={'ID Number is required'}
                                           onChange={this.textChanged}
                                           value={this.props.person && this.props.person.idNumber}/>
                                </div>
                            </div>
                            <div className="two fields">
                                <div className="field">
                                    <label>Email</label>
                                    <Input type="text"
                                           name={'email'}
                                           htmlFor={'email'}
                                           isrequired={false}
                                           onChange={this.textChanged}
                                           value={this.props.person && this.props.person.email}/>
                                </div>
                                {this.props.fullForm &&
                                <div className="field">
                                    <label>User Name</label>
                                    <Input type="text"
                                           name={'credentials.userName'}
                                           htmlFor={'credentials.userName'}
                                           isrequired={false}
                                           onChange={this.textChanged}
                                           value={this.props.person && this.props.person.credentials
                                           && this.props.person.credentials.userName}/>
                                </div>
                                }
                            </div>
                            {this.props.fullForm &&
                            <div className="two fields">
                                <Permit role='SYSAD,BLDIR,BLDMG' permission=''>
                                    <div className="field">
                                        <label>Member Organization</label>
                                        <SingleSelect
                                            name="organization"
                                            required={true}
                                            placeholder="Select Member Organization"
                                            selectedValue={this.props.person && this.props.person.organization}
                                            _valueChanged={this.organizationChanged}
                                            selectUrl={organizationMemberURL}/>
                                    </div>
                                </Permit>
                                <Permit role='SYSAD,BLDIR,BLDMG,SEDIR,SECMG' permission=''>
                                    <div className="field">
                                        <label>Role Within Facility</label>
                                        <SingleSelect
                                            name="roleCode"
                                            required={true}
                                            placeholder="Select Role Within Facility"
                                            selectedValue={this.props.person && this.props.person.roleCode}
                                            _valueChanged={this.roleChanged}
                                            selectUrl={userRolesURL}/>
                                    </div>
                                </Permit>
                            </div>
                            }
                            {this.props.fullForm &&
                            <Permit role='SYSAD' permission=''>
                                <div className="field">
                                    <div className="two fields">
                                        <div className="field">
                                            <label>Facility</label>
                                            <SingleSelect
                                                name="facility"
                                                required={true}
                                                placeholder="Select Facility"
                                                selectedValue={this.props.person && this.props.person.facility}
                                                _valueChanged={this.props.facilityChanged}
                                                selectUrl={facilityURL}/>
                                        </div>
                                        <div className="field">
                                        </div>
                                    </div>
                                </div>
                            </Permit>
                            }
                        </div>
                    </div>
                    <div className="ui bottom attached segment">
                        <button type="button" onClick={this.savePerson} className="ui primary button">Save</button>
                        <button type="button" onClick={this.cancelPerson} className="ui red button">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
});

window.OrganizationForm = React.createClass({
    propTypes: {
        //All these are required to for the use of this component
        task: React.PropTypes.string.isRequired,
        organization: React.PropTypes.object.isRequired,
        organizationRights: React.PropTypes.array.isRequired,
        textChanged: React.PropTypes.func.isRequired,
        addressTextChanged: React.PropTypes.func.isRequired,
        countryChanged: React.PropTypes.func.isRequired,
        saveOrganization: React.PropTypes.func.isRequired,
        cancelOrganization: React.PropTypes.func.isRequired,
        fullForm: React.PropTypes.bool.isRequired,
        handleRightsAddClick: React.PropTypes.func,
        handleRightsDeleteClick: React.PropTypes.func,
        facilityChanged: React.PropTypes.func,
        orgRoleChanged: React.PropTypes.func,
        handleEffectiveDateChange: React.PropTypes.func,
        handleExpirationDateChange: React.PropTypes.func
    },


    handleRightsAddClick: function () {
        this.props.handleRightsAddClick();
    },
    handleRightsDeleteClick: function (index) {
        this.props.handleRightsDeleteClick(index);
    },
    facilityChanged: function (index, passedValue) {
        this.props.facilityChanged();
    },
    orgRoleChanged: function (index, passedValue) {
        this.props.orgRoleChanged();
    },
    handleEffectiveDateChange: function (index, date) {
        this.props.handleEffectiveDateChange();
    },
    handleExpirationDateChange: function (index, date) {
        this.props.handleExpirationDateChange();
    },

    saveOrganization: function () {
        this.props.saveOrganization();
    },

    cancelOrganization: function () {
        this.props.cancelOrganization();
    },


    countryChanged: function (passedValue) {
        this.props.countryChanged(passedValue);
    },

    textChanged: function (event) {
        this.props.textChanged(event);
    },

    addressTextChanged: function (event) {
        this.props.addressTextChanged(event);
    },

    render: function () {

        var rightsItems = <OrganizationRightsRow/>;
        var _this = this;
        {
            this.props.organizationRights && this.props.organizationRights.length > 0 && (
                rightsItems = this.props.organizationRights.map(function (rightsItem, i) {
                    var boundRightsDeleteClick = _this.props.handleRightsDeleteClick.bind(null, i);
                    var boundFacilityChange = _this.props.facilityChanged.bind(null, i);
                    var boundOrgRoleChange = _this.props.orgRoleChanged.bind(null, i);
                    var boundHandleEffectiveDateChange = _this.props.handleEffectiveDateChange.bind(null, i);
                    var boundHandleExpirationDateChange = _this.props.handleExpirationDateChange.bind(null, i);
                    return (
                        <OrganizationRightsRow key={i} index={i}
                                               rightsItem={rightsItem}
                                               facilityChanged={boundFacilityChange}
                                               orgRoleChanged={boundOrgRoleChange}
                                               handleEffectiveDateChange={boundHandleEffectiveDateChange}
                                               handleExpirationDateChange={boundHandleExpirationDateChange}
                                               handleRightsDeleteClick={boundRightsDeleteClick}/>
                    )
                }, this))
        }

        return (
            <div className="ui form">
                <div className="ui segments">
                    <h4 className="ui top attached header">{this.props.task} Organization</h4>
                    <div className="ui attached segment">
                        <div className="field">
                            <div className="two fields">
                                <div className="field">
                                    <label>Name</label>
                                    <Input type="text"
                                           name={'name'}
                                           htmlFor={'name'}
                                           isrequired={true}
                                           onChange={this.textChanged}
                                           messageRequired={'Organization Name is required'}
                                           value={this.props.organization && this.props.organization.name}/>
                                </div>
                                <div className="field">
                                    <label>Description</label>
                                    <Input type="textarea"
                                           name={'description'}
                                           htmlFor={'description'}
                                           isrequired={true}
                                           rows={1}
                                           onChange={this.textChanged}
                                           messageRequired={'Organization Description is required'}
                                           value={this.props.organization && this.props.organization.description}/>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="two fields">
                                <div className="field">
                                    <label>Address 1</label>
                                    <Input type="text"
                                           name={'address1'}
                                           htmlFor={'address1'}
                                           isrequired={true}
                                           onChange={this.addressTextChanged}
                                           messageRequired={'Address is required'}
                                           value={this.props.organization && this.props.organization.address
                                           && this.props.organization.address.address1}/>
                                </div>
                                <div className="field">
                                    <label>Address 2</label>
                                    <Input type="text"
                                           name={'address2'}
                                           htmlFor={'address2'}
                                           isrequired={false}
                                           onChange={this.addressTextChanged}
                                           value={this.props.organization && this.props.organization.address
                                           && this.props.organization.address.address2}/>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="two fields">
                                <div className="field">
                                    <label>City</label>
                                    <Input type="text"
                                           name={'city'}
                                           htmlFor={'city'}
                                           isrequired={true}
                                           onChange={this.addressTextChanged}
                                           messageRequired={'City is required'}
                                           value={this.props.organization && this.props.organization.address
                                           && this.props.organization.address.city}/>
                                </div>
                                <div className="field">
                                    <label>Country</label>
                                    <SingleSelect
                                        name="country.code"
                                        placeholder="Select Country"
                                        selectedValue={this.props.organization && this.props.organization.address
                                        && this.props.organization.address.country && this.props.organization.address.country.code}
                                        _valueChanged={this.countryChanged}
                                        selectUrl={countryURL}/>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="two fields">
                                <div className="field">
                                    <label>Tax ID</label>
                                    <Input type="text"
                                           name={'taxId'}
                                           htmlFor={'taxId'}
                                           isrequired={true}
                                           onChange={this.textChanged}
                                           messageRequired={'Tax ID is required'}
                                           value={this.props.organization && this.props.organization.taxId}/>
                                </div>
                                <div className="field">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui attached segment">
                        <h4 className="ui dividing header">Organization Rights</h4>
                        <table className="ui single line celled unstackable striped table">
                            <thead>
                            <tr>
                                <th>Facility</th>
                                <th>Organization Role</th>
                                <th>Effective Date</th>
                                <th>Expiration Date</th>
                                <th className="collapsing one wide">&emsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rightsItems}
                            </tbody>
                            <tfoot className="full-width">
                            <tr>
                                <th colSpan="5">
                                    <button type="button" className="ui right floated small green button"
                                            onClick={this.props.handleRightsAddClick}>
                                        Add Row
                                    </button>
                                </th>
                            </tr>
                            </tfoot>
                        </table>
                        <div className="ui bottom attached segment">
                            <button type="button" onClick={this.saveOrganization} className="ui primary button">Save
                            </button>
                            <button type="button" onClick={this.cancelOrganization} className="ui red button">Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


window.OrganizationRightsRow = React.createClass({
    propTypes: {
        //All these are required to for the use of this component
        rightsItem: React.PropTypes.object.isRequired,
        handleRightsDeleteClick: React.PropTypes.func.isRequired,
        facilityChanged: React.PropTypes.func.isRequired,
        orgRoleChanged: React.PropTypes.func.isRequired,
        handleEffectiveDateChange: React.PropTypes.func.isRequired,
        handleExpirationDateChange: React.PropTypes.func.isRequired
    },

    render: function () {
        return (
            <tr>
                <td>
                    <div className="field">
                        <SingleSelect
                            name="facility"
                            placeholder="Select a Facility"
                            selectedValue={this.props.rightsItem
                            && this.props.rightsItem.facility
                            && this.props.rightsItem.facility.id}
                            _valueChanged={this.props.facilityChanged}
                            selectUrl={facilityURL}/>
                    </div>
                </td>
                <td>
                    <div className="field">
                        <SingleSelect
                            name="orgRole"
                            placeholder="Select a Role"
                            selectedValue={this.props.rightsItem
                            && this.props.rightsItem.role
                            && this.props.rightsItem.role.cd}
                            _valueChanged={this.props.orgRoleChanged}
                            selectUrl={orgRoleURL}/>
                    </div>
                </td>
                <td>
                    <div className="field">
                        <Input type="dateOnly"
                               id={'effectiveDate' + this.props.index}
                               name={'effectiveDate'}
                               isrequired={true}
                               onChange={this.props.handleEffectiveDateChange}
                               messageRequired={'Effective Date is required'}
                               value={this.props.rightsItem
                               && this.props.rightsItem.effectiveDate}/>
                    </div>
                </td>
                <td>
                    <div className="field">
                        <Input type="dateOnly"
                               id={'expirationDate' + this.props.index}
                               name={'expirationDate'}
                               isrequired={false}
                               onChange={this.props.handleExpirationDateChange}
                               value={this.props.rightsItem
                               && this.props.rightsItem.expirationDate}/>
                    </div>
                </td>
                <td>
                    <button className="ui icon small red button" onClick={this.props.handleRightsDeleteClick}>
                        <i className="remove icon"/>
                    </button>
                </td>
            </tr>
        )
    }
});


window.PersonOrgSearchRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>
                    <button className="ui icon secondary submit button" onClick={this.props.handleSelectClick}>
                        Select
                    </button>
                </td>
            </tr>
        );
    }
});

window.PersonOrgEmptyRow = React.createClass({
    render: function () {
        //var isCompany = this.props.searchType == "Company";
        return (
            <tr>
                <td colspan="2">
                    No results found. Would you like to create a
                    new {(this.props.searchType == "Company") ? "Company" : "Individual"}?
                    <br/>
                    <br/>
                    <br/>
                    <button type="button" onClick={this.props.createNew} className="ui primary button">Yes</button>
                    <button type="button" onClick={this.props.noCreate} className="ui red button">No</button>
                </td>
            </tr>
        );
    }
});

window.PersonOrgSearchResult = React.createClass({
    render: function () {
        var searchItems = null;
        var _this = this;
        const haveResults = (this.props.items !== undefined) && (this.props.items.length > 0);
        {
            haveResults ?
                (
                    searchItems = this.props.items.map(function (item, i) {
                        var boundSelectClick = _this.props.handleSelectClick.bind(i, item);
                        return (
                            <PersonOrgSearchRow
                                key={item.id}
                                index={i}
                                item={item}
                                handleSelectClick={boundSelectClick}/>
                        )
                    }, this)
                ) :
                (
                    searchItems = <PersonOrgEmptyRow searchType={this.props.searchType}
                                                     createNew={this.props.createNew}
                                                     noCreate={this.props.noCreate}/>

                )
        }
        return (
            <table className="ui fixed single line celled unstackable striped attached table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {searchItems}
                </tbody>
            </table>
        );
    }
});

window.PersonOrgSearch = React.createClass({

    getInitialState: function () {
        return {
            items: [],
            searchParameters: {
                searchType: null,
                idType: null,
                idNumber: null,
                organizationName: null
            },
            searchComplete: false
        }
    },

    search: function () {
        var params = JSON.stringify(this.state.searchParameters);
        $.ajax({
            async: false,
            url: personOrgSearchURL,
            contentType: "application/json; charset=utf-8",
            method: 'POST',
            headers: {
                "cache-control": "no-cache"
            },
            dataType: 'json',
            data: params,
            cache: false,
            success: function (data) {
                this.setState({
                    items: data, searchComplete: true
                });
            }.bind(this),
            error: function (xhr, status, err) {
                if (xhr.responseJson != undefined) {
                    this.setState({
                        messageResponses: {
                            message: xhr.responseJson.message,
                            type: xhr.responseJson.status,
                            hidden: false
                        }
                    });
                }
                console.log("form not sent" + err.toString());
            }.bind(this)
        });
    },

    clearValues: function () {
        this.setState({
            items: [],
            searchParameters: {
                searchType: null,
                idType: null,
                idNumber: null,
                organizationName: null
            },
            searchComplete: false
        });
    },

    createNew: function () {
        this.props.createNew(this.state.searchParameters.searchType);
        this.cancel();
    },

    noCreate: function () {
        this.cancel();
    },

    cancel: function () {
        this.clearValues();
        this.props._hideModal();
    },

    searchIdTypeChanged: function (passedValue) {
        var tmp = this.state.searchParameters;
        tmp.idType = passedValue.value;
        this.setState({
            searchParameters: tmp,
            items: []
        });
    },

    textChanged: function (event) {
        var values = this.state.searchParameters;
        values['' + event.target.name + ''] = event.target.value;
        this.setState({searchParameters: values});
    },

    toggle: function (event) {
        var tmp = this.state.searchParameters;
        tmp.searchType = event.target.value;
        this.setState({
            searchParameters: tmp
        });
    },

    handleSelectClick: function (item, event) {
        this.props.setSelection(item);
        this.clearValues();
        this.props._hideModal();
    },

    render: function () {
        return (
            <div className="ui form">
                <h4 className="ui top attached header">Individual/Company Search</h4>
                <div className="ui attached segment">
                    <div className="field">
                        <div className="three fields">
                            <Input type="radio"
                                   name={'vendorType'}
                                   onChange={this.toggle}
                                   label="Company"
                                   isChecked={this.state.searchParameters.searchType == "Company" ? true : false}
                                   value={'Company'}/>
                            <Input type="radio"
                                   name={'vendorType'}
                                   onChange={this.toggle}
                                   label="Individual"
                                   isChecked={this.state.searchParameters.searchType == "Individual" ? true : false}
                                   value={'Individual'}/>
                        </div>
                    </div>
                    {
                        this.state.searchParameters && this.state.searchParameters.searchType == 'Individual' && (
                            <div className="field">
                                <div className="three fields">
                                    <div className="field">
                                        <label>ID Number</label>
                                        <Input type="text"
                                               name={'idNumber'}
                                               id={'idNumber'}
                                               isrequired={true}
                                               onChange={this.searchIdTypeChanged}
                                               messageRequired={'ID Number is required'}
                                               value={this.state.searchParameters && this.state.searchParameters.idNumber}/>
                                    </div>
                                    <SingleSelect
                                        name={'searchParameters.idType'}
                                        label="ID Type"
                                        placeholder="Select ID Type"
                                        selectedValue={this.state.searchParameters && this.state.searchParameters.idType}
                                        valueChanged={this.idTypeChanged}
                                        selectUrl={listIdTypeUrl}/>

                                    <div className="field">
                                        <button className="ui primary button" type="button"
                                                onClick={this.search}>Search
                                        </button>
                                        <button className="ui red button" type="button" onClick={this.cancel}>Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {
                        this.state.searchParameters && this.state.searchParameters.searchType == 'Company' && (
                            <div className="field segment">
                                <div className="two fields">
                                    <div className="field">
                                        <label>Company Name</label>
                                        <Input type="text"
                                               name={'organizationName'}
                                               id={'organizationName'}
                                               isrequired={true}
                                               onChange={this.textChanged}
                                               messageRequired={'Company Name is required'}
                                               value={this.state.searchParameters && this.state.searchParameters.organizationName}/>
                                    </div>
                                    <div className="field">
                                        <button className="ui primary button" type="button"
                                                onClick={this.search}>Search
                                        </button>
                                        <button className="ui red button" type="button" onClick={this.cancel}>Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        this.state.searchComplete && (
                            <div className="ui bottom attached segment">
                                <PersonOrgSearchResult
                                    items={this.state.items}
                                    createNew={this.createNew}
                                    noCreate={this.noCreate}
                                    searchType={this.state.searchParameters && this.state.searchParameters.searchType}
                                    handleSelectClick={this.handleSelectClick}/>
                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
});
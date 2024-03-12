import { body, cookie } from 'express-validator';
import {errorStrings} from '@common/error-strings'
import {serviceToken} from '@services/service-token'
import ApiError from '@api-error/index'
import OrganizationServiceCategory from '@models/organization-service-category';
import ServiceCategory from '@models/service-category';


export const validationServiceCreation = {
    createChain() {
        return  [
            body('name').notEmpty().withMessage(errorStrings.notBeEmptyField('name')).trim(),
            body('description').notEmpty().withMessage(errorStrings.notBeEmptyField('description')).trim(),
            body('price').notEmpty().withMessage(errorStrings.notBeEmptyField('price')).trim(),
            body('serviceCategoryId').isNumeric().withMessage(errorStrings.beNumber('serviceCategoryId')).trim(),
            cookie('refreshToken').custom(async(value: string, meta) => {
                const serviceCategoryId = meta.req.body.serviceCategoryId
                const organizationId = serviceToken.validationToken(value)


                try {
                    const result = await OrganizationServiceCategory.findOne({
                        where: {
                            serviceCategoryId,
                            organizationId: organizationId.id
                        },
                        include: {
                            model: ServiceCategory,
                            as: 'serviceCategory'
                        }
                    })
        
                    if(result.dataValues.id) {
                        return Promise.reject(ApiError.bedRequest(`Услуга с категорией - ${result.dataValues.serviceCategory.name}  уже есть`));

                    } else {
                        return Promise.resolve(true);
                    }
        
                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(error));
                }
            }),
            cookie('refreshToken').custom((value: string, meta) => {

                try {
                    const result = serviceToken.validationToken(value)
        
                    if(result.isOrganization) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(ApiError.bedRequest(errorStrings.onlyForOrganiztion()));
                    }
        
                } catch (error) {
                    return Promise.reject(ApiError.unauthorized(errorStrings.expireToken()));
                }
            })
        ]
    }
} 
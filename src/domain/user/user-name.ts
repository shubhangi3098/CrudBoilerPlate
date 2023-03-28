
import { ValueObject, Result } from "@softobiz-df/shared-lib";

interface IUserNameProps {
	// isAuth: boolean
    firstName:string
    lastName:string
	
}
/**
 * The UserName Class
 *
 * @export
 * @class UserName
 * @extends {ValueObject<IUserNameProps>}
 */
export class UserName extends ValueObject<IUserNameProps> {
    
    /**
     * Creates an instance of UserName.
     * @param {IUserNameProps} props
     * @memberof UserName
     */
    private constructor(props: IUserNameProps) {
        super(props);
    }

    /**
     * Creates and initializes object for the UserName Class using the private constructor after validations
     *
     * @static
     * @param {IUserNameProps} props
     * @returns {Result<UserName>}
     * @memberof UserName
     */
    public static create(props: IUserNameProps): Result<UserName> {
        throw new Error("NotImplemented: This method is not implemented");
    }
}

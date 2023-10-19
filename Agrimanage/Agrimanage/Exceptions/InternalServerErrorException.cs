using System.Net;

namespace Agrimanage.Exceptions
{
    public class InternalServerErrorException : BaseException
    {
        public InternalServerErrorException(string message) : base(message, null, HttpStatusCode.InternalServerError)
        {
        }
    }
}

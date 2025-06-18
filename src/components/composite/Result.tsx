import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
export type ResultProps = {
  resetFields: () => void;
  result: string | null;
};
export const Result = (props: ResultProps) => {
  const { resetFields, result } = props;
  return (
    <div>
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-100">
                Image Description
              </h3>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-200 leading-relaxed">{result}</p>
            </div>
            <Button
              onClick={() => {
                resetFields();
              }}
              variant="outline"
              className="w-full bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
            >
              Process Another Image
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
